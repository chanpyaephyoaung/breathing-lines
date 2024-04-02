import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import UserProfileHeader from "../components/User/UserProfileHeader.jsx";
import BorderBox from "../components/UI/BorderBox.jsx";
import Container from "../components/UI/Container.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import Modal from "../components/UI/Modal.jsx";
import { USER_PROFILE_SUB_MENU_LINKS } from "../constants.js";
import { useCreateNewCollectionMutation } from "../slices/usersApiSlice.js";
import { toast } from "react-toastify";

const UserCollectionsPage = () => {
   const { userId } = useParams();
   const activeNav = USER_PROFILE_SUB_MENU_LINKS[2].activeNavPathIdentifier;
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [collectionName, setCollectionName] = useState("");

   const [createNewCollection, { isLoading: loadingCreateNewCollection }] =
      useCreateNewCollectionMutation();

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const openModal = () => {
      setIsModalOpen(true);
   };

   const createNewCollectionHandler = async () => {
      try {
         await createNewCollection({ userId, collectionName });
         toast.success("Collection created successfully");
         // refetch

         closeModal();
      } catch (err) {
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   return (
      <>
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
         <Container>
            <>
               <UserProfileHeader activeNav={activeNav} />
               <div className="grid">
                  <button
                     type="button"
                     onClick={openModal}
                     className="justify-self-center mb-8 text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                  >
                     &#43; Create new collection
                  </button>
                  <div>
                     <BorderBox>
                        <div className="flex items-center justify-center gap-x-4">
                           <p className="text-clr-black text-sm md:text-lg font-regular underline">
                              Drafts
                           </p>
                           <Link
                              to={`/user-profile/${userId}/poems/drafted`}
                              className="text-xs py-3 px-5 md:text-sm text-clr-tertiary font-medium border border-clr-tertiary rounded-full hover:bg-clr-tertiary hover:text-clr-white focus:outline-none focus:border-clr-tertiary focus:ring-clr-tertiary focus:ring-1 transition duration-300 leading-none"
                           >
                              View all
                           </Link>
                        </div>
                     </BorderBox>
                  </div>

                  <div>
                     <BorderBox>
                        <div className="flex items-center justify-center gap-x-4">
                           <p className="text-clr-black text-sm md:text-lg font-regular underline">
                              Published
                           </p>
                           <Link
                              to={`/user-profile/${userId}/poems/published`}
                              className="text-xs py-3 px-5 md:text-sm text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                           >
                              View all
                           </Link>
                        </div>
                     </BorderBox>
                  </div>
               </div>
            </>
         </Container>
      </>
   );
};
export default UserCollectionsPage;
