import React from "react";
import HeaderSection from "../components/Section/HeaderSection.tsx";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.tsx";

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
