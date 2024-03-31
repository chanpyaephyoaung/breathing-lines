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
               {poems?.map((poem) => (
                  <PoemPreviewPost
                     key={poem.poem._id}
                     poemId={poem.poem._id}
                     datePosted={poem.poem.datePosted}
                     viewsCount={poem.poem.viewsCount}
                     coverImg={poem.poem.coverImg}
                     title={poem.poem.title}
                     author={poem.poem.author}
                     content={poem.poem.content}
                     encodedCoverImg={poem.encodedCoverImg || ""}
                  />
               ))}
            </div>
         )}
      </>
   );
};
export default PoemPreviewPosts;
