import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";
import Container from "../components/UI/Container.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import { useGetPoemsRecommendationsQuery } from "../slices/usersApiSlice.js";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminDashboard from "../components/Admin/AdminDashboard.jsx";
import { infiniteScrollLoaderDuration } from "../constants.js";
import { toast } from "react-toastify";

const PoemsForYouPage = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);
   const { data: poems, isLoading, error } = useGetPoemsRecommendationsQuery(userAccInfo?._id);
   console.log(poems);
   console.log(isLoading);

   const [poemList, setPoemList] = useState([]);
   const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);

   useEffect(() => {
      const generatePoemsRecommendations = async () => {
         try {
            if (!userAccInfo?._id) return;
            setIsGeneratingRecommendations(true);
            await axios.post(
               `https://breathing-lines-rec-sys.onrender.com/personalized-feed/${userAccInfo?._id}`
            );
            setIsGeneratingRecommendations(false);
            setPoemList(poems?.slice(0, 3) || []);
         } catch (err) {
            toast(err?.data?.errMessage || err.error);
         }
      };

      generatePoemsRecommendations();
   }, [userAccInfo?._id, poems]);

   const fetchMoreData = () => {
      if (isLoading || error) return; // Prevent fetching more data if loading or error
      const nextPoems = poems.slice(poemList.length, poemList.length + 2);
      setTimeout(() => {
         setPoemList(poemList.concat(nextPoems));
      }, infiniteScrollLoaderDuration);
   };

   return (
      <>
         <Container>
            {isGeneratingRecommendations && <LoaderSpinner />}
            {poems && poems.length === 0 ? (
               <div className="text-center py-6">
                  <Message type="danger">
                     You have not interacted with poems much yet! Like more poems so we can show you
                     more poems you might like!
                  </Message>
               </div>
            ) : userAccInfo?.isAdmin ? (
               <AdminDashboard />
            ) : isLoading ? (
               <LoaderSpinner />
            ) : error ? (
               <h2>{error?.data?.errMessage || error.error}</h2>
            ) : (
               <>
                  <InfiniteScroll
                     dataLength={poemList.length}
                     next={fetchMoreData}
                     hasMore={poemList.length < poems.length}
                     loader={<LoaderSpinner />}
                     endMessage={
                        <p className="text-xs md:text-sm text-clr-primary text-center py-6">
                           End of results!
                        </p>
                     }
                  >
                     <PoemPreviewPosts poems={poemList} />
                  </InfiniteScroll>
               </>
            )}
         </Container>
      </>
   );
};
export default PoemsForYouPage;
