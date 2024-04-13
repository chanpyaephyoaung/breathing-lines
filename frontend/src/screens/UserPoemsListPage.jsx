import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../components/UI/Container.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetPoemsOfUserQuery } from "../slices/usersApiSlice.js";
import { infiniteScrollLoaderDuration } from "../constants.js";

const UserPoemsListPage = () => {
   const { userId, status } = useParams();
   const [poemList, setPoemList] = useState([]);
   const { userAccInfo } = useSelector((state) => state.authUser);

   const { data: poems, isLoading, error, refetch } = useGetPoemsOfUserQuery({ userId, status });

   useEffect(() => {
      if (userAccInfo?.isAdmin) return;
      setPoemList(poems?.slice(0, 3) || []);
      refetch();
   }, [refetch, poems, userAccInfo.isAdmin]);

   const fetchMoreData = () => {
      if (isLoading || error) return; // Prevent fetching more data if loading or error
      const nextPoems = poems.slice(poemList.length, poemList.length + 2);
      setTimeout(() => {
         setPoemList(poemList.concat(nextPoems));
      }, infiniteScrollLoaderDuration);
   };

   return (
      <Container>
         {isLoading ? (
            <LoaderSpinner />
         ) : error ? (
            <Message type="danger">{error?.data?.errMessage || error.error}</Message>
         ) : (
            <>
               <div className="flex items-center gap-x-6">
                  <h2 className="text-lg md:text-2xl mx-auto font-bold text-clr-black">
                     My {status === "drafted" ? "Drafts" : "Publishs"}
                  </h2>
               </div>
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
   );
};
export default UserPoemsListPage;
