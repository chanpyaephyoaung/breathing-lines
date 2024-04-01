import HeaderSection from "../components/Section/HeaderSection.jsx";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";
import Container from "../components/UI/Container.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import { useGetAllPoemsQuery } from "../slices/poemsApiSlice.js";

const HomePage = () => {
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
            <>
               <HeaderSection />
               <PoemPreviewPosts poems={poems} />
            </>
         )}
      </>
   );
};
export default HomePage;
