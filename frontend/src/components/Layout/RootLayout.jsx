import { useState } from "react";
import { Outlet } from "react-router";
import MainNav from "../Navbar/MainNav.jsx";

const RootLayout = ({ socket }) => {
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
            onHideMainNav={hideMainNavHandler}
            showMainNav={showMainNav}
            socket={socket}
         />
         <Outlet context={socket} />
      </>
   );
};
export default RootLayout;
