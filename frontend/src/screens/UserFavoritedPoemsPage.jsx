import { useParams, useOutletContext } from "react-router-dom";
import Container from "../components/UI/Container";
import UserProfileHeader from "../components/User/UserProfileHeader.jsx";
import { USER_PROFILE_SUB_MENU_LINKS } from "../constants.js";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import { useGetPoemsOfUserQuery } from "../slices/usersApiSlice.js";

const UserFavoritedPoemsPage = () => {
   const socket = useOutletContext();
   const { userId } = useParams();

   const {
      data: poems,
      isLoading,
      error,
   } = useGetPoemsOfUserQuery({ userId, status: "favorites" });

   const activeNav = USER_PROFILE_SUB_MENU_LINKS[3].activeNavPathIdentifier;

   return (
      <Container>
         <>
            <UserProfileHeader activeNav={activeNav} socket={socket} />
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-10">
               {isLoading ? (
                  <div className="col-span-2">
                     <LoaderSpinner />
                  </div>
               ) : error ? (
                  <div className="col-span-2">
                     <Message type="danger">{error?.data?.errMessage || error.error}</Message>
                  </div>
               ) : (
                  <div className="col-span-2">
                     {poems?.length === 0 && (
                        <div className="text-center">
                           <Message type="danger">
                              You have not liked any poem yet. Like one now!
                           </Message>
                        </div>
                     )}
                     <PoemPreviewPosts poems={poems} />
                  </div>
               )}
            </div>
         </>
      </Container>
   );
};
export default UserFavoritedPoemsPage;
