import React from "react";
import Navbar from "./Navbar.tsx";
import SubMenu from "./SubMenu.tsx";
import ToggleNavBar from "./ToggleNavBar.tsx";

const MainNav = ({ onShowMainNav, onHideMainNav, showMainNav }) => {
   return (
      <div className="sticky top-0">
         <Navbar onShowMainNav={onShowMainNav} />
         <ToggleNavBar onHideMainNav={onHideMainNav} showMainNav={showMainNav} />
         <SubMenu />
      </div>
   );
};
export default MainNav;
