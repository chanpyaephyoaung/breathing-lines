import React from "react";
import { Bars3Icon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import UserDropdown from "./Dropdown/UserDropdown.tsx";
import NotificationDropdown from "./Dropdown/NotificationDropdown.tsx";

const Navbar = ({ onShowMainNav, userType }) => {
   const handleMainNavClick = (e) => {
      e.preventDefault();
      onShowMainNav();
   };

   return (
      <nav className="bg-clr-bg border-b border-clr-black border-1 p-6 relative">
         <div className="grid grid-cols-3 items-center after:content-[''] after:w-full after:h-px after:bg-clr-black after:absolute after:-bottom-1.5 after:left-0">
            <Bars3Icon
               onClick={handleMainNavClick}
               className="transition-all w-6 md:w-8 text-clr-black hover:text-clr-primary cursor-pointer stroke-1"
            />

            <a
               href=" "
               className="justify-self-center text-lg md:text-2xl font-['Playfair_Display'] tracking-wider cursor-pointer"
            >
               BreathingLines
            </a>

            <div className="justify-self-end flex gap-3 items-center">
               {userType === "user" && (
                  <>
                     <NotificationDropdown />

                     <UserDropdown />
                  </>
               )}
               {userType === "admin" && (
                  <ArrowRightOnRectangleIcon className="transition-all w-6 md:w-8 text-clr-black hover:text-clr-primary stroke-1 cursor-pointer" />
               )}
            </div>
         </div>
      </nav>
   );
};
export default Navbar;
