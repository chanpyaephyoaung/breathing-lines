import { useParams } from "react-router-dom";
import PoemPreviewPostDrafted from "./PoemPreviewPostDrafted.jsx";
import { useGetPoemsOfUserQuery } from "../../../../slices/usersApiSlice.js";
import Container from "../../../UI/Container.jsx";
import LoaderSpinner from "../../../UI/LoaderSpinner.jsx";

const PoemPreviewPostsDrafted = ({ statusType }) => {
   const { userId, status } = useParams();

   const { data: poems, isLoading, error } = useGetPoemsOfUserQuery({ userId, status });

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
                  <PoemPreviewPostDrafted
                     key={poem._id}
                     poemId={poem._id}
                     datePosted={poem.datePosted}
                     viewsCount={poem.viewsCount}
                     coverImg={poem.coverImg}
                     title={poem.title}
                     author={poem.author}
                     content={poem.content}
                     encodedCoverImg={poem.encodedCoverImg || ""}
                     statusType={statusType}
                  />
               ))}
            </div>
         )}
      </>
   );
};
export default PoemPreviewPostsDrafted;
