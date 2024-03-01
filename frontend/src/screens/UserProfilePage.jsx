import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../components/UI/Container";
import { useGetUserProfileQuery } from "../slices/usersApiSlice.js";
import UserProfileSubMenu from "../components/Navbar/UserProfileSubMenu.jsx";
import { USER_PROFILE_SUB_MENU_LINKS } from "../constants.js";
import BorderBox from "../components/UI/BorderBox.jsx";
import CommentBox from "../components/User/CommentBox.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import { generateLineBreakBtwSentences } from "../utils/text.jsx";

const UserProfilePage = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);
   const { activeNavIdentifier } = USER_PROFILE_SUB_MENU_LINKS[0];

   const { data: userProfileDetails, error, isLoading } = useGetUserProfileQuery();

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
                     <img
                        src={`data:image/jpeg;base64,${userProfileDetails?.encodedProfileImage}`}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-clr-black"
                        alt=""
                     />
                     <div>
                        <h2 className="text-lg md:text-2xl font-bold text-clr-black">
                           {userAccInfo.name}
                        </h2>
                        <p className="flex gap-x-2 text-xs md:text-sm font-light text-clr-black">
                           <Link className="transition-all hover:text-clr-primary">
                              {userProfileDetails?.currentUser?.followers.length} followers
                           </Link>
                           /
                           <Link className="transition-all hover:text-clr-primary">
                              {userProfileDetails?.currentUser?.followings.length} followings
                           </Link>
                        </p>
                     </div>
                  </div>
                  <p className="text-sm md:text-base font-light text-clr-black mt-6">
                     {userProfileDetails?.currentUser?.profileDesc
                        ? generateLineBreakBtwSentences(
                             userProfileDetails?.currentUser?.profileDesc
                          )
                        : userAccInfo._id === userProfileDetails?.currentUser._id
                        ? "Add your description..."
                        : ""}
                  </p>
                  <Link
                     to="/account-profile/update"
                     className="inline-block text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none mt-6"
                  >
                     Edit Profile
                  </Link>
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
                           {userProfileDetails?.currentUser?.profileViewsCount === 0 ? (
                              <Message type="success">You have not yet been discovered!</Message>
                           ) : (
                              <Message type="success">
                                 `${userProfileDetails?.currentUser?.profileViewsCount} people have
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

                           {userProfileDetails?.currentUser.profileReviews &&
                           userProfileDetails?.currentUser.profileReviews.length > 0 ? (
                              <>
                                 {userProfileDetails?.currentUser.profileReviews.map((comment) => (
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
