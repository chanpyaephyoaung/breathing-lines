import Navbar from "./Navbar.jsx";
import SubMenu from "./SubMenu.jsx";
import ToggleNavBar from "./ToggleNavBar.jsx";

const MainNav = ({ onShowMainNav, onHideMainNav, showMainNav }) => {
   return (
      <div className="sticky top-0">
         <ToggleNavBar onHideMainNav={onHideMainNav} showMainNav={showMainNav} />
         <Navbar onShowMainNav={onShowMainNav} />
         <SubMenu />
      </div>
   );
};
export default MainNav;
