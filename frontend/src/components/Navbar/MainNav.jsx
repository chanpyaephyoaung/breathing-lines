import Navbar from "./Navbar.jsx";
import SubMenu from "./SubMenu.jsx";
import ToggleNavBar from "./ToggleNavBar.jsx";

const MainNav = ({ onShowMainNav, onHideMainNav, userType, showMainNav }) => {
   return (
      <div className="sticky top-0">
         <ToggleNavBar onHideMainNav={onHideMainNav} showMainNav={showMainNav} />
         <Navbar onShowMainNav={onShowMainNav} userType={userType} />
         <SubMenu userType={userType} />
      </div>
   );
};
export default MainNav;
