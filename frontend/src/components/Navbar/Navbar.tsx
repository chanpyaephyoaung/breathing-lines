import React from "react";
import { Bars3Icon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import UserDropdown from "./Dropdown/UserDropdown.tsx";
import NotificationDropdown from "./Dropdown/NotificationDropdown.tsx";

const Navbar = ({ onToggleMainNav, userType }) => {
   const handleMainNavClick = (e) => {
      e.preventDefault();
      onToggleMainNav();
   };

   return (
      <nav className="border-b border-clr-black border-1 p-4 relative">
         <div className="grid grid-cols-3 items-center after:content-[''] after:w-full after:h-px after:bg-clr-black after:absolute after:-bottom-1.5 after:left-0">
            <Bars3Icon onClick={handleMainNavClick} className="w-6 h-6 text-clr-black" />

            <a
               href=" "
               className="justify-self-center text-lg font-['Playfair_Display'] tracking-wider cursor-pointer"
            >
               BreathingLines
            </a>

            <div className="justify-self-end flex gap-3">
               {userType === "user" && (
                  <>
                     <NotificationDropdown />

                     <UserDropdown />
                  </>
               )}
               {userType === "admin" && (
                  <ArrowRightOnRectangleIcon className="w-6 h-6 text-clr-black" />
               )}
            </div>
         </div>
      </nav>
   );
};
export default Navbar;
