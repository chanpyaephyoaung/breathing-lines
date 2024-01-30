import HeaderSection from "../components/Section/HeaderSection.jsx";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.jsx";

const isLoggedIn = true;

const HomePage = () => {
   return (
      <>
         {isLoggedIn && (
            <>
               <HeaderSection />
               <PoemPreviewPosts />
            </>
         )}
      </>
   );
};
export default HomePage;
