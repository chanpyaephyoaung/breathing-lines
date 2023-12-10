import React from "react";
import { useState } from "react";

import PoemPreviewPosts from "./components/Poems/PoemPreview/PoemPreviewPosts.tsx";
import HeaderSection from "./components/Section/HeaderSection.tsx";
import SignInSection from "./components/Section/SignInSection.tsx";
import SignUpSection from "./components/Section/SignUpSection.tsx";
import UploadPoemSection from "./components/Section/UploadPoemSection.tsx";
import PoemFullPost from "./components/Poems/PoemFullPost/PoemFullPost.tsx";
import MainNav from "./components/Navbar/MainNav.tsx";

const userType = "admin";

function App() {
   const [showMainNav, setShowMainNav] = useState<boolean>(false);

   const showMainNavHandler = () => {
      setShowMainNav(true);
   };

   const hideMainNavHandler = () => {
      setShowMainNav(false);
   };

   return (
      <>
         <MainNav
            onShowMainNav={showMainNavHandler}
            userType={userType}
            onHideMainNav={hideMainNavHandler}
            showMainNav={showMainNav}
         />
         <HeaderSection />
         <PoemPreviewPosts />
         {/* <SignInSection /> */}
         {/* <SignUpSection /> */}
         {/* <UploadPoemSection /> */}
         {/* <PoemFullPost /> */}
      </>
   );
}

export default App;
