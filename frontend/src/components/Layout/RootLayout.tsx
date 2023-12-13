import React from "react";
import { useState } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainNav from "../Navbar/MainNav.tsx";

const userType = "guest";

const RootLayout = () => {
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
         <Outlet />
         <ToastContainer />
      </>
   );
};
export default RootLayout;
