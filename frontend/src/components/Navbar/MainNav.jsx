import Navbar from "./Navbar.jsx";
import SubMenu from "./SubMenu.jsx";
import ToggleNavBar from "./ToggleNavBar.jsx";

const MainNav = ({ onShowMainNav, onHideMainNav, showMainNav, socket }) => {
   return (
      <div className="sticky top-0 z-10">
         <ToggleNavBar onHideMainNav={onHideMainNav} showMainNav={showMainNav} />
         <Navbar socket={socket} onShowMainNav={onShowMainNav} />
         <SubMenu />
      </div>
   );
};
export default MainNav;
