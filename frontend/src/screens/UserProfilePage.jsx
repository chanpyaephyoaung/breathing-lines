import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Container from "../components/UI/Container";
import { UserIcon } from "@heroicons/react/24/outline";
import { useGetUserProfileQuery } from "../slices/usersApiSlice.js";
import UserProfileSubMenu from "../components/Navbar/UserProfileSubMenu.jsx";
import { USER_PROFILE_SUB_MENU_LINKS } from "../constants.js";
import BorderBox from "../components/UI/BorderBox.jsx";
import CommentBox from "../components/User/CommentBox.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import { generateLineBreakBtwSentences } from "../utils/text.jsx";

const UserProfilePage = () => {
   const { userId } = useParams();
   const { userAccInfo } = useSelector((state) => state.authUser);
   const { activeNavIdentifier } = USER_PROFILE_SUB_MENU_LINKS[0];

   const { data: userProfileDetails, error, isLoading } = useGetUserProfileQuery(userId);

   return (
      <Container>
         {isLoading ? (
            <LoaderSpinner />
         ) : error ? (
            <Message type="danger">{error?.data?.errMessage || error.error}</Message>
         ) : (
            <>
               <div className="mb-6">
                  <div className="flex items-center gap-x-6">
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
                  </div>
                  <p className="text-sm md:text-base font-light text-clr-black mt-6">
                     {userProfileDetails?.targetUser?.profileDesc
                        ? generateLineBreakBtwSentences(userProfileDetails?.targetUser?.profileDesc)
                        : userAccInfo._id === userProfileDetails?.targetUser._id
                        ? "Add your description..."
                        : ""}
                  </p>
                  {userAccInfo._id === userProfileDetails?.targetUser._id && (
                     <Link
                        to={`/user-profile/${userAccInfo._id}/update`}
                        className="inline-block text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none mt-6"
                     >
                        Edit Profile
                     </Link>
                  )}
               </div>

               <div className="grid justify-items-center mb-8">
                  <UserProfileSubMenu activeNav={activeNavIdentifier} />
               </div>

               <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-10">
                  <div>
                     <BorderBox>
                        <div className="grid justify-center text-center gap-y-6">
                           <p className="text-clr-black text-sm md:text-lg font-regular underline">
                              Views
                           </p>
                           {userProfileDetails?.targetUser?.profileViewsCount === 0 ? (
                              <Message type="success">You have not yet been discovered!</Message>
                           ) : (
                              <Message type="success">
                                 `${userProfileDetails?.targetUser?.profileViewsCount} people have
                                 viewed your profile!`
                              </Message>
                           )}
                        </div>
                     </BorderBox>
                  </div>

                  <div>
                     <BorderBox>
                        <div className="grid justify-center text-center gap-y-6">
                           <p className="text-clr-black text-sm md:text-lg font-regular underline">
                              Reviews
                           </p>

                           {userProfileDetails?.targetUser.profileReviews &&
                           userProfileDetails?.targetUser.profileReviews.length > 0 ? (
                              <>
                                 {userProfileDetails?.targetUser.profileReviews.map((comment) => (
                                    <CommentBox key={comment._id} review={comment} />
                                 ))}
                                 <button
                                    type="button"
                                    className="justify-self-center text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                                 >
                                    View all
                                 </button>
                              </>
                           ) : (
                              <Message type="success">No reviews yet!</Message>
                           )}
                        </div>
                     </BorderBox>
                  </div>
               </div>
            </>
         )}
      </Container>
   );
};
export default UserProfilePage;
