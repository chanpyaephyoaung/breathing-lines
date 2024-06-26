import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderSection from "../components/Section/HeaderSection.jsx";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";
import Container from "../components/UI/Container.jsx";
import Message from "../components/Typography/Message.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import { useGetAllPoemsQuery } from "../slices/poemsApiSlice.js";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminDashboard from "../components/Admin/AdminDashboard.jsx";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { infiniteScrollLoaderDuration, infiniteScrollElementLimit } from "../constants.js";

const HomePage = () => {
   const { keyword } = useParams();
   const { userAccInfo } = useSelector((state) => state.authUser);
   const { data: poems, isLoading, error, refetch } = useGetAllPoemsQuery({ keyword });
   const [poemList, setPoemList] = useState([]);

   useEffect(() => {
      refetch();
      if (userAccInfo?.isAdmin) return;
      setPoemList(poems?.slice(0, infiniteScrollElementLimit + 1) || []);
   }, [poems, userAccInfo?.isAdmin, refetch]);

   const fetchMoreData = () => {
      if (isLoading || error) return; // Prevent fetching more data if loading or error
      const nextPoems = poems.slice(poemList.length, poemList.length + infiniteScrollElementLimit);
      setTimeout(() => {
         setPoemList(poemList.concat(nextPoems));
      }, infiniteScrollLoaderDuration);
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
               <Message type="danger">{error?.data?.errMessage || error.error}</Message>
            </Container>
         ) : (
            <>
               {keyword && (
                  <Container>
                     <div className="flex gap-x-4 items-center">
                        <Link to={"/"}>
                           <ArrowLongLeftIcon className="w-10 text-clr-black hover:text-clr-primary cursor-pointer" />
                        </Link>
                        <h2 className="text-lg md:text-2xl font-bold text-clr-black">
                           {`Search results for `}{" "}
                           <span className="text-clr-primary">{`"${keyword}"`}</span>
                        </h2>
                     </div>
                  </Container>
               )}
               {!keyword && <HeaderSection />}
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
