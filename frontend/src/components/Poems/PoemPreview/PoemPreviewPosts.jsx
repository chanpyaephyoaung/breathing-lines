import PoemPreviewPost from "./PoemPreviewPost.jsx";
import { useGetAllPoemsQuery } from "../../../slices/poemsApiSlice.js";
import Container from "../../UI/Container.jsx";
import LoaderSpinner from "../../UI/LoaderSpinner.jsx";

const PoemPreviewPosts = () => {
   const { data: poems, isLoading, error } = useGetAllPoemsQuery();

   return (
      <>
         {isLoading ? (
            <Container>
               <LoaderSpinner />
            </Container>
         ) : error ? (
            <Container>
               <h2>{error?.data?.errMessage || error.error}</h2>
            </Container>
         ) : (
            <div className="mt-6 w-4/6 md:w-5/6 max-w-[450px] mx-auto grid gap-6 py-5">
               {poems?.poems.map((poem) => (
                  <PoemPreviewPost
                     key={poem._id}
                     id={poem._id}
                     datePosted={poem.datePosted}
                     viewsCount={poem.viewsCount}
                     coverImg={poem.coverImg}
                     title={poem.title}
                     author={poem.author.name}
                     content={poem.content}
                     encodedCoverImg={poems.encodedCoverImg || ""}
                  />
               ))}
            </div>
         )}
      </>
   );
};
export default PoemPreviewPosts;
