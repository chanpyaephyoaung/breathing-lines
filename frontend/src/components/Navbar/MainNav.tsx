import React from "react";
import Navbar from "./Navbar.tsx";
import SubMenu from "./SubMenu.tsx";
import ToggleNavBar from "./ToggleNavBar.tsx";

const MainNav = ({ onShowMainNav, onHideMainNav, userType, showMainNav }) => {
   return (
      <div className="sticky top-0">
         <Navbar onShowMainNav={onShowMainNav} userType={userType} />
         <ToggleNavBar onHideMainNav={onHideMainNav} showMainNav={showMainNav} />
         <SubMenu userType={userType} />
      </div>
   );
};
export default MainNav;
