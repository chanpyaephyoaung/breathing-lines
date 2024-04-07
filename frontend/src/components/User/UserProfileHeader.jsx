import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { useGetUserProfileQuery } from "../../slices/usersApiSlice.js";
import UserProfileSubMenu from "../../components/Navbar/UserProfileSubMenu.jsx";
import LoaderSpinner from "../../components/UI/LoaderSpinner.jsx";
import Message from "../../components/Typography/Message.jsx";
import Modal from "../../components/UI/Modal.jsx";
import { toast } from "react-toastify";
import { generateLineBreakBtwSentences } from "../../utils/text.jsx";
import {
   useSubscribeUserMutation,
   useGetFollowersOfUserQuery,
} from "../../slices/usersApiSlice.js";
import UserBox from "./UserBox.jsx";

const UserProfileHeader = ({ activeNav }) => {
   const { userId } = useParams();
   const { userAccInfo } = useSelector((state) => state.authUser);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [followerFollowingList, setFollowerFollowingList] = useState([]);
   const [modalDesc, setModalDesc] = useState("");
   const [isFollowerBtnClicked, setIsFollowerBtnClicked] = useState(false);

   const {
      data: userProfileDetails,
      error: fetchingUserProfileDetailsError,
      isLoading: loadingFetchUserProfileDetails,
      refetch,
   } = useGetUserProfileQuery(userId);
   const { data: userFollowersList, isLoading: loadingFetchFollowersList } =
      useGetFollowersOfUserQuery(userId);

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const openModal = () => {
      setIsModalOpen(true);
   };

   const viewFollowersCtaHandler = () => {
      setFollowerFollowingList(userFollowersList);
      setIsFollowerBtnClicked(true);
      setModalDesc("Followers");
      openModal();
   };

   const [subscribeUser] = useSubscribeUserMutation();

   const subscribeUserHandler = async () => {
      try {
         const res = await subscribeUser(userId).unwrap();
         toast(res.message);
         refetch();
      } catch (err) {
         toast(err?.data?.errMessage || err.error);
      }
   };

   return (
      <>
         <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
            desc={modalDesc}
            discardBtnText={null}
            confirmBtnText={null}
         >
            {followerFollowingList?.map((follower) => (
               <UserBox
                  key={follower._id}
                  id={follower._id}
                  name={follower.name}
                  img={follower.encodedProfileImg}
                  onCloseModal={closeModal}
                  userProfileDetails={userProfileDetails}
                  refetch={refetch}
                  isFollowerBtnClicked={isFollowerBtnClicked}
               />
            ))}
         </Modal>
         {loadingFetchUserProfileDetails || loadingFetchFollowersList ? (
            <LoaderSpinner />
         ) : fetchingUserProfileDetailsError ? (
            <Message type="danger">
               {fetchingUserProfileDetailsError?.data?.errMessage ||
                  fetchingUserProfileDetailsError.error}
            </Message>
         ) : (
            <>
               <div className="mb-6">
                  <div className="flex items-center gap-x-6">
                     <div className="self-start">
                        {userProfileDetails?.encodedProfileImage ? (
                           <img
                              src={`data:image/jpeg;base64,${userProfileDetails?.encodedProfileImage}`}
                              className="w-16 h-16 md:w-20 md:h-20 text-xs rounded-full object-cover border-2 border-clr-black"
                              alt="user profile image"
                           />
                        ) : (
                           <div className="grid place-items-center w-16 h-16 md:w-20 md:h-20 text-xs rounded-full border-2 border-clr-black">
                              <UserIcon className="w-8 h-8 md:w-12 md:h-12 text-xs rounded-full" />
                           </div>
                        )}
                     </div>
                     <div className="w-full grid gap-y-2 justify-items-start md:flex items-center md:justify-between">
                        <div>
                           <h2 className="text-lg md:text-2xl font-bold text-clr-black">
                              {userProfileDetails?.targetUser.name}
                           </h2>
                           <p className="flex gap-x-2 text-xs md:text-sm font-light text-clr-black">
                              <Link
                                 onClick={viewFollowersCtaHandler}
                                 className="transition-all hover:text-clr-primary"
                              >
                                 {userProfileDetails?.targetUser?.followers.length} followers
                              </Link>
                              /
                              <Link
                                 onClick={viewFollowersCtaHandler}
                                 className="transition-all hover:text-clr-primary"
                              >
                                 {userProfileDetails?.targetUser?.followings.length} followings
                              </Link>
                           </p>
                        </div>
                        {userAccInfo._id !== userProfileDetails?.targetUser._id && (
                           <button
                              onClick={subscribeUserHandler}
                              type="button"
                              className="justify-self-start text-xs py-3 px-5 md:text-sm text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                           >
                              {userProfileDetails?.targetUser?.followers.includes(userAccInfo._id)
                                 ? " Unfollow"
                                 : "Follow"}
                           </button>
                        )}
                     </div>
                  </div>
               </div>
               <p className="text-sm md:text-base font-light text-clr-black my-6">
                  {userProfileDetails?.targetUser?.profileDesc
                     ? generateLineBreakBtwSentences(userProfileDetails?.targetUser?.profileDesc)
                     : userAccInfo._id === userProfileDetails?.targetUser._id
                     ? "Add your description..."
                     : ""}
               </p>
               {userAccInfo._id === userProfileDetails?.targetUser._id && (
                  <Link
                     to={`/user-profile/${userAccInfo._id}/update`}
                     className="inline-block text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none mb-6"
                  >
                     Edit Profile
                  </Link>
               )}

               <div className="grid justify-items-center mb-8">
                  <UserProfileSubMenu activeNav={activeNav} userId={userId} />
               </div>
            </>
         )}
      </>
   );
};
export default UserProfileHeader;
