import { Link } from "react-router-dom";
import { useParams, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../components/UI/Container";
import UserProfileHeader from "../components/User/UserProfileHeader.jsx";
import BorderBox from "../components/UI/BorderBox.jsx";
import { USER_PROFILE_SUB_MENU_LINKS } from "../constants.js";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import { useGetPoemsOfUserQuery } from "../slices/usersApiSlice.js";

const UserPoemsPage = () => {
   const socket = useOutletContext();
   const { userId } = useParams();
   const { userAccInfo } = useSelector((state) => state.authUser);

   const isCurrentUserTheAuthor = userAccInfo._id.toString() === userId.toString();

   const { data: poems, isLoading, error, refetch } = useGetPoemsOfUserQuery({ userId });

   const activeNav = USER_PROFILE_SUB_MENU_LINKS[1].activeNavPathIdentifier;

   return (
      <Container>
         <>
            <UserProfileHeader activeNav={activeNav} socket={socket} />
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-10">
               {isCurrentUserTheAuthor ? (
                  <>
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
                  </>
               ) : isLoading ? (
                  <LoaderSpinner />
               ) : error ? (
                  <Message type="danger">{error?.data?.errMessage || error.error}</Message>
               ) : (
                  <PoemPreviewPosts poems={poems} />
               )}
            </div>
         </>
      </Container>
   );
};
export default UserPoemsPage;
