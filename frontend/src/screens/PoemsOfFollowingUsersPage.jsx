import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";
import Container from "../components/UI/Container.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import { useGetAllPoemsOfFollowingUsersQuery } from "../slices/poemsApiSlice.js";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminDashboard from "../components/Admin/AdminDashboard.jsx";
import { infiniteScrollLoaderDuration } from "../constants.js";

const PoemsOfFollowingUsersPage = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);
   const { data: poems, isLoading, error } = useGetAllPoemsOfFollowingUsersQuery();

   const [poemList, setPoemList] = useState([]);

   useEffect(() => {
      if (userAccInfo?.isAdmin) return;
      setPoemList(poems?.slice(0, 3) || []);
   }, [poems, userAccInfo?.isAdmin]);

   const fetchMoreData = () => {
      if (isLoading || error) return; // Prevent fetching more data if loading or error
      const nextPoems = poems.slice(poemList.length, poemList.length + 2);
      setTimeout(() => {
         setPoemList(poemList.concat(nextPoems));
      }, infiniteScrollLoaderDuration);
   };

   return (
      <>
         {poems && poems.length === 0 ? (
            <Container>
               <div className="text-center py-6">
                  <Message type="danger">
                     You have not followed any author yet! Follow them to never miss their poems!
                  </Message>
               </div>
            </Container>
         ) : userAccInfo?.isAdmin ? (
            <Container>
               <AdminDashboard />
            </Container>
         ) : isLoading ? (
            <Container>
               <LoaderSpinner />
            </Container>
         ) : error ? (
            <Container>
               <h2>{error?.data?.errMessage || error.error}</h2>
            </Container>
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
      </>
   );
};
export default PoemsOfFollowingUsersPage;
