import { useParams, useNavigate, Link } from "react-router-dom";
import Container from "../components/UI/Container.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";
import { useGetOneCollectionOfUserQuery } from "../slices/collectionApiSlice.js";
import { useIncreaseProfileViewCountMutation } from "../slices/usersApiSlice.js";
import { toast } from "react-toastify";

const CollectionPage = () => {
   const navigate = useNavigate();
   const { userId, collectionId } = useParams();
   const {
      data: collection,
      isLoading,
      error,
      refetch,
   } = useGetOneCollectionOfUserQuery({ userId, collectionId });

   const [increaseProfileViewCount] = useIncreaseProfileViewCountMutation();

   const viewAuthorProfileHandler = async () => {
      try {
         navigate(`/user-profile/${userId}`);
         await increaseProfileViewCount(userId);
      } catch (err) {
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
               <div className="flex flex-col items-center gap-x-6">
                  <h2 className="text-lg md:text-2xl mx-auto font-bold text-clr-black">
                     Collection - <span className="text-clr-primary">{collection.name}</span>
                  </h2>
                  <p className="text-sm md:text-base text-clr-black-light font-light">
                     By{" "}
                     <Link
                        onClick={viewAuthorProfileHandler}
                        to={`/user-profile/${userId}`}
                        className="transition-all text-sm md:text-base text-clr-black-light font-light hover:text-clr-primary"
                     >
                        {collection.createdBy.name}
                     </Link>
                  </p>
               </div>
               {collection.poems.length === 0 ? (
                  <div className="text-center mt-8">
                     <Message type="danger">
                        This collection is empty. Start collecting poems you resonate this
                        collection with!
                     </Message>
                  </div>
               ) : (
                  <PoemPreviewPosts poems={collection.poems} />
               )}
            </>
         )}
      </Container>
   );
};
export default CollectionPage;
