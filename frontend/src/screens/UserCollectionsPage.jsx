import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import UserProfileHeader from "../components/User/UserProfileHeader.jsx";
import Container from "../components/UI/Container.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import Modal from "../components/UI/Modal.jsx";
import { USER_PROFILE_SUB_MENU_LINKS } from "../constants.js";
import {
   useGetCollectionsOfUserQuery,
   useCreateNewCollectionMutation,
} from "../slices/collectionApiSlice.js";
import { toast } from "react-toastify";
import CollectionBox from "../components/Collection/CollectionBox.jsx";

const UserCollectionsPage = () => {
   const socket = useOutletContext();
   const { userId } = useParams();
   const activeNav = USER_PROFILE_SUB_MENU_LINKS[2].activeNavPathIdentifier;
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [collectionName, setCollectionName] = useState("");
   const { userAccInfo } = useSelector((state) => state.authUser);

   const {
      data: collections,
      loadingFetchingCollections,
      error,
      refetch,
   } = useGetCollectionsOfUserQuery(userId);
   const [createNewCollection, { isLoading: loadingCreateNewCollection }] =
      useCreateNewCollectionMutation();

   useEffect(() => {
      refetch();
   }, [refetch]);

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const openModal = () => {
      setIsModalOpen(true);
   };

   const createNewCollectionHandler = async () => {
      try {
         if (!collectionName) {
            toast.error("Collection name is required!");
            return;
         }
         await createNewCollection({ userId, collectionName });
         toast.success("Collection created successfully!");
         setCollectionName("");
         closeModal();
         refetch();
      } catch (err) {
         setCollectionName("");
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   const isTargetUserTheCurrentUser = userId.toString() === userAccInfo._id.toString();

   return (
      <>
         {!loadingCreateNewCollection && (
            <Modal
               isOpen={isModalOpen}
               closeModal={closeModal}
               desc="Create a new collection"
               confirmBtnText="Create"
               discardBtnText="Discard"
               successFunc={createNewCollectionHandler}
            >
               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">Name</span>
                  <p className="text-sm font-medium">Name</p>
                  <div className="justify-self-stretch relative">
                     <input
                        className={`placeholder:text-clr-black-faded text-sm py-3 md:py-3 pl-4 pr-4 block bg-clr-white w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                        placeholder="name"
                        type="text"
                        name="name"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                     />
                  </div>
               </label>
            </Modal>
         )}
         {loadingFetchingCollections || loadingCreateNewCollection ? (
            <Container>
               <LoaderSpinner />
            </Container>
         ) : error ? (
            <Container>
               <Message type="danger">{error?.data?.message || error.error}</Message>
            </Container>
         ) : (
            <Container>
               <>
                  <UserProfileHeader activeNav={activeNav} socket={socket} />
                  <div className="grid">
                     {isTargetUserTheCurrentUser && (
                        <button
                           type="button"
                           onClick={openModal}
                           className="justify-self-center mb-8 text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                        >
                           &#43; Create new collection
                        </button>
                     )}
                     {collections?.length === 0 && (
                        <div className="text-center">
                           <Message type="danger">
                              You have no collections yet. Create one now!
                           </Message>
                        </div>
                     )}
                     {collections?.map((collection) => (
                        <CollectionBox
                           key={collection._id}
                           collectionId={collection._id}
                           name={collection.name}
                           userId={userId}
                        />
                     ))}
                  </div>
               </>
            </Container>
         )}
      </>
   );
};
export default UserCollectionsPage;
