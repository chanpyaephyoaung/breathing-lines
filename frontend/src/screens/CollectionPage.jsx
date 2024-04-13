import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../components/UI/Container.jsx";
import { TrashIcon } from "@heroicons/react/24/outline";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import Modal from "../components/UI/Modal.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { infiniteScrollLoaderDuration } from "../constants.js";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";
import {
   useGetOneCollectionOfUserQuery,
   useRemovePoemFromCollectionMutation,
   useDeleteOneCollectionOfUserMutation,
} from "../slices/collectionApiSlice.js";
import { useIncreaseProfileViewCountMutation } from "../slices/usersApiSlice.js";
import { toast } from "react-toastify";

const CollectionPage = () => {
   const navigate = useNavigate();
   const { userId, collectionId } = useParams();
   const { userAccInfo } = useSelector((state) => state.authUser);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [poemList, setPoemList] = useState([]);

   const {
      data: collection,
      isLoading,
      error,
      refetch,
   } = useGetOneCollectionOfUserQuery({ userId, collectionId });

   const [increaseProfileViewCount] = useIncreaseProfileViewCountMutation();
   const [removePoemFromCollection, { isLoading: loadingRemovePoemFromCollection }] =
      useRemovePoemFromCollectionMutation();

   const [deleteOneCollectionOfUser, { isLoading: loadingDeleteCollection }] =
      useDeleteOneCollectionOfUserMutation();

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const openModal = () => {
      setIsModalOpen(true);
   };

   useEffect(() => {
      if (userAccInfo?.isAdmin) return;
      setPoemList(collection?.poems?.slice(0, 3) || []);
      refetch();
   }, [refetch, collection?.poems, userAccInfo.isAdmin]);

   const fetchMoreData = () => {
      if (isLoading || error) return; // Prevent fetching more data if loading or error
      const nextPoems = collection?.poems.slice(poemList.length, poemList.length + 2);
      setTimeout(() => {
         setPoemList(poemList.concat(nextPoems));
      }, infiniteScrollLoaderDuration);
   };

   const isCurrentUserTheCollectionOwner =
      collection?.createdBy?._id.toString() === userAccInfo._id.toString();

   const removePoemFromCollectionHandler = async (poemId) => {
      try {
         const res = await removePoemFromCollection({ userId, collectionId, poemId }).unwrap();
         refetch();

         toast.success(res.message);
      } catch (err) {
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   const viewAuthorProfileHandler = async () => {
      try {
         navigate(`/user-profile/${userId}`);
         await increaseProfileViewCount(userId);
      } catch (err) {
         toast(err?.data?.errMessage || err.error);
      }
   };

   const ctaHandler = async () => {
      try {
         const res = await deleteOneCollectionOfUser({ userId, collectionId }).unwrap();
         navigate(`/user-profile/${userId}/collections`);
         toast.success(res.message);
         refetch();
         closeModal();
      } catch (err) {
         closeModal();
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   return (
      <>
         {!loadingDeleteCollection && (
            <Modal
               isOpen={isModalOpen}
               closeModal={closeModal}
               desc="Are you sure you want to remove this collection? This action cannot be undone."
               confirmBtnText="Confirm"
               successFunc={ctaHandler}
            />
         )}
         <Container>
            {isLoading || loadingRemovePoemFromCollection || loadingDeleteCollection ? (
               <LoaderSpinner />
            ) : error ? (
               <Message type="danger">{error?.data?.errMessage || error.error}</Message>
            ) : (
               <>
                  <div className="relative flex flex-col items-center gap-x-6">
                     {isCurrentUserTheCollectionOwner && (
                        <TrashIcon
                           onClick={openModal}
                           className={`transition-all absolute right-0 top-0 w-[17px] md:w-[25px] stroke-[2] text-clr-black hover:text-clr-primary cursor-pointer`}
                        />
                     )}
                     <h2 className="text-lg md:text-2xl mx-auto font-bold text-clr-black">
                        Collection - <span className="text-clr-primary">{collection?.name}</span>
                     </h2>
                     <p className="text-sm md:text-base text-clr-black-light font-light">
                        By{" "}
                        <Link
                           onClick={viewAuthorProfileHandler}
                           to={`/user-profile/${userId}`}
                           className="transition-all text-sm md:text-base text-clr-black-light font-light hover:text-clr-primary"
                        >
                           {collection?.createdBy.name}
                        </Link>
                     </p>
                  </div>
                  {collection?.poems.length === 0 ? (
                     <div className="text-center mt-8">
                        <Message type="danger">
                           This collection is empty. Start collecting poems you resonate this
                           collection with!
                        </Message>
                     </div>
                  ) : (
                     <InfiniteScroll
                        dataLength={poemList.length}
                        next={fetchMoreData}
                        hasMore={poemList.length < collection?.poems.length}
                        loader={<LoaderSpinner />}
                        endMessage={
                           <p className="text-xs md:text-sm text-clr-primary text-center py-6">
                              End of results!
                           </p>
                        }
                     >
                        <PoemPreviewPosts
                           poems={poemList}
                           removePoemFromCollectionHandler={removePoemFromCollectionHandler}
                           loadingRemovePoemFromCollection={loadingRemovePoemFromCollection}
                           isCurrentUserTheCollectionOwner={isCurrentUserTheCollectionOwner}
                        />
                     </InfiniteScroll>
                  )}
               </>
            )}
         </Container>
      </>
   );
};
export default CollectionPage;
