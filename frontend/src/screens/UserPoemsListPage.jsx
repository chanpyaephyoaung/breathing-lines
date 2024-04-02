import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Container from "../components/UI/Container.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";
import { useGetPoemsOfUserQuery } from "../slices/usersApiSlice.js";

const UserPoemsListPage = () => {
   const { userId, status } = useParams();

   const { data: poems, isLoading, error, refetch } = useGetPoemsOfUserQuery({ userId, status });

   useEffect(() => {
      refetch();
   }, [refetch]);

   return (
      <Container>
         {isLoading ? (
            <LoaderSpinner />
         ) : error ? (
            <Message type="danger">{error?.data?.errMessage || error.error}</Message>
         ) : (
            <>
               <div className="flex items-center gap-x-6">
                  <ArrowLongLeftIcon className="h-10 w-10 text-clr-black" />
                  <h2 className="text-lg md:text-2xl font-bold text-clr-black">
                     My {status === "drafted" ? "Drafts" : "Publishs"}
                  </h2>
               </div>
               <PoemPreviewPosts poems={poems} />
            </>
         )}
      </Container>
   );
};
export default UserPoemsListPage;
