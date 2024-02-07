import PoemPreviewPost from "./PoemPreviewPost.jsx";
import { useGetAllPoemsQuery } from "../../../slices/poemsApiSlice.js";
import Container from "../../UI/Container.jsx";

const PoemPreviewPosts = () => {
   const { data: poems, isLoading, error } = useGetAllPoemsQuery();
   console.log(poems);

   return (
      <>
         {isLoading ? (
            <Container>
               <h2>Loading...</h2>
            </Container>
         ) : error ? (
            <Container>
               <h2>{error?.data?.message || error.error}</h2>
            </Container>
         ) : (
            <div className="mt-6 w-4/6 md:w-5/6 max-w-[900px] mx-auto grid gap-6 py-5 md:grid-cols-2">
               {poems.map((poem) => (
                  <PoemPreviewPost
                     key={poem._id}
                     id={poem._id}
                     datePosted={poem.datePosted}
                     viewsCount={poem.viewsCount}
                     coverImg={poem.coverImg}
                     title={poem.title}
                     author={poem.author.name}
                     content={poem.content}
                  />
               ))}
            </div>
         )}
      </>
   );
};
export default PoemPreviewPosts;
