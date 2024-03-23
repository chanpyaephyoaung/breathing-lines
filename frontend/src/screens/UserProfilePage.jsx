import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../components/UI/Container";
import UserProfileHeader from "../components/User/UserProfileHeader.jsx";
import { USER_PROFILE_SUB_MENU_LINKS } from "../constants.js";
import { useGetUserProfileQuery } from "../slices/usersApiSlice.js";
import BorderBox from "../components/UI/BorderBox.jsx";
import CommentBox from "../components/User/CommentBox.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import { toast } from "react-toastify";
import { useCreateAuthorProfileReviewMutation } from "../slices/usersApiSlice.js";

const UserProfilePage = () => {
   const { userId } = useParams();
   const activeNav = USER_PROFILE_SUB_MENU_LINKS[0].activeNavPathIdentifier;
   const { userAccInfo } = useSelector((state) => state.authUser);
   const [review, setReview] = useState("");

   const { data: userProfileDetails, error, isLoading, refetch } = useGetUserProfileQuery(userId);
   const [createProfileReview] = useCreateAuthorProfileReviewMutation();

   const createProfileReviewSubmitHandler = async (e) => {
      e.preventDefault();
      try {
         const res = await createProfileReview({ userId, review }).unwrap();
         toast(res.message);
         refetch();
         setReview("");
      } catch (err) {
         setReview("");
         toast(err?.data?.errMessage || err.error);
      }
   };

   return (
      <Container>
         {isLoading ? (
            <LoaderSpinner />
         ) : error ? (
            <Message type="danger">{error?.data?.errMessage || error.error}</Message>
         ) : (
            <>
               <UserProfileHeader activeNav={activeNav} />
               <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-10">
                  <div>
                     <BorderBox>
                        <div className="grid justify-center text-center gap-y-6">
                           <p className="text-clr-black text-sm md:text-lg font-regular underline">
                              Views
                           </p>
                           {userProfileDetails?.targetUser?.profileViewsCount === 0 ? (
                              <Message type="success">
                                 {userAccInfo._id === userProfileDetails.targetUser._id
                                    ? "You "
                                    : userProfileDetails.targetUser.name}{" "}
                                 have not yet been discovered!
                              </Message>
                           ) : (
                              <Message type="success">
                                 `{userProfileDetails?.targetUser?.profileViewsCount} people have
                                 viewed{" "}
                                 {userAccInfo._id === userProfileDetails.targetUser._id
                                    ? "your "
                                    : userProfileDetails.targetUser.name.split(" ")[0] + "'s "}
                                 profile!`
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
                           {userAccInfo._id !== userProfileDetails?.targetUser._id && (
                              <>
                                 <form
                                    onSubmit={createProfileReviewSubmitHandler}
                                    className="w-full grid gap-y-4"
                                 >
                                    <label className="relative text-xs grid justify-items-start gap-y-2">
                                       <span className="sr-only">Post</span>
                                       <div className="justify-self-stretch relative">
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>

                                          <input
                                             className={`w-full placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-4 md:pl-4 pr-3 block bg-clr-bg border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                                             placeholder="Leave a profile review..."
                                             type="text"
                                             name="profile-review"
                                             onChange={(e) => setReview(e.target.value)}
                                             value={review}
                                          />
                                       </div>
                                    </label>
                                    <button
                                       type="submit"
                                       className="justify-self-center text-xs py-3 px-5 md:text-sm text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                                    >
                                       Post
                                    </button>
                                 </form>
                                 {/* <Divider /> */}
                              </>
                           )}
                           {userProfileDetails?.targetUser.profileReviews &&
                           userProfileDetails?.targetUser.profileReviews.length > 0 ? (
                              <>
                                 {userProfileDetails?.targetUser.profileReviews.map((comment) => (
                                    <CommentBox key={comment._id} review={comment} />
                                 ))}
                                 {/* <button
                                    type="button"
                                    className="justify-self-center text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                                 >
                                    View all
                                 </button> */}
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
