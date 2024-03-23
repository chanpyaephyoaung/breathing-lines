import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/UI/Container";
import { UserIcon } from "@heroicons/react/24/outline";
import { useGetUserProfileQuery } from "../../slices/usersApiSlice.js";
import UserProfileSubMenu from "../../components/Navbar/UserProfileSubMenu.jsx";
import { USER_PROFILE_SUB_MENU_LINKS } from "../../constants.js";
import LoaderSpinner from "../../components/UI/LoaderSpinner.jsx";
import Message from "../../components/Typography/Message.jsx";
import { toast } from "react-toastify";
import { generateLineBreakBtwSentences } from "../../utils/text.jsx";
import { useSubscribeUserMutation } from "../../slices/usersApiSlice.js";

const UserProfileHeader = () => {
   const { userId } = useParams();
   const { userAccInfo } = useSelector((state) => state.authUser);
   const { activeNavIdentifier } = USER_PROFILE_SUB_MENU_LINKS[0];

   const { data: userProfileDetails, error, isLoading, refetch } = useGetUserProfileQuery(userId);
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
         {isLoading ? (
            <LoaderSpinner />
         ) : error ? (
            <Message type="danger">{error?.data?.errMessage || error.error}</Message>
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
                              <Link className="transition-all hover:text-clr-primary">
                                 {userProfileDetails?.targetUser?.followers.length} followers
                              </Link>
                              /
                              <Link className="transition-all hover:text-clr-primary">
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
                     className="inline-block text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none my-6"
                  >
                     Edit Profile
                  </Link>
               )}

               <div className="grid justify-items-center mb-8">
                  <UserProfileSubMenu activeNav={activeNavIdentifier} userId={userId} />
               </div>
            </>
         )}
      </>
   );
};
export default UserProfileHeader;
