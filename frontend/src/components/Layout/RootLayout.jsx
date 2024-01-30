import { useState } from "react";
import { Outlet } from "react-router";
import MainNav from "../Navbar/MainNav.jsx";

const userType = "admin";

const RootLayout = () => {
   const [showMainNav, setShowMainNav] = useState(false);

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
      </>
   );
};
export default RootLayout;
