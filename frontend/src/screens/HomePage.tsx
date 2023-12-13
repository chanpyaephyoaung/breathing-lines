import React from "react";
import HeaderSection from "../components/Section/HeaderSection.tsx";
import PoemPreviewPosts from "../components/Poems/PoemPreview/PoemPreviewPosts.tsx";

const isLoggedIn = false;

const HomePage = () => {
   return (
      <>
         {!isLoggedIn && (
            <>
               <HeaderSection />
               <PoemPreviewPosts />
            </>
         )}
      </>
   );
};
export default HomePage;
