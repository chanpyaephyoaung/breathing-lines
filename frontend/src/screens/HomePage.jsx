import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeaderSection from "../components/Section/HeaderSection.jsx";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";
import Container from "../components/UI/Container.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import { useGetAllPoemsQuery } from "../slices/poemsApiSlice.js";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminDashboard from "../components/Admin/AdminDashboard.jsx";

const HomePage = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);
   const { data: poems, isLoading, error } = useGetAllPoemsQuery();
   const [poemList, setPoemList] = useState([]);

   useEffect(() => {
      if (userAccInfo?.isAdmin) return;
      setPoemList(poems?.slice(0, 1) || []);
   }, [poems, userAccInfo.isAdmin]);

   const fetchMoreData = () => {
      if (isLoading || error) return; // Prevent fetching more data if loading or error
      const nextPoems = poems.slice(poemList.length, poemList.length + 2);
      setTimeout(() => {
         setPoemList(poemList.concat(nextPoems));
      }, 1500);
   };

   return (
      <>
         {userAccInfo?.isAdmin ? (
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
               <HeaderSection />
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
export default HomePage;
