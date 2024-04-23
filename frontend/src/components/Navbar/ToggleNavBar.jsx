import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const ToggleNavBar = ({ onHideMainNav, showMainNav }) => {
   const handleMainNavClick = () => {
      onHideMainNav();
   };

   const handleCloseMainNav = (e) => {
      e.preventDefault();
      onHideMainNav();
   };

   return (
      <div
         className={`transition-all z-50 ${
            showMainNav ? "opacity-100 visible" : "opacity-0 invisible"
         } w-full h-screen overflow-hidden bg-clr-bg fixed top-0 left-0`}
      >
         <Link onClick={handleCloseMainNav}>
            <XMarkIcon className="w-9 h-9 md:w-11 md:h-11 text-clr-black stroke-[0.7] absolute right-4 top-4" />
         </Link>

         <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 p-2">
            <ul className="grid gap-14 list-none uppercase text-2xl md:text-3xl font-extralight tracking-normal">
               <li className="cursor-pointer">
                  <Link
                     to={"/about"}
                     onClick={handleMainNavClick}
                     className="inline-block transition-transform md:hover:scale-110 md:hover:translate-x-2 md:hover:font-normal md:hover:text-clr-primary"
                     href=" "
                  >
                     About
                  </Link>
               </li>
               <li className="cursor-pointer">
                  <Link
                     to={"/faq"}
                     onClick={handleMainNavClick}
                     className="inline-block transition-transform md:hover:scale-110 md:hover:translate-x-2 md:hover:font-normal md:hover:text-clr-primary"
                     href=" "
                  >
                     FAQ
                  </Link>
               </li>
            </ul>
         </nav>
      </div>
   );
};
export default ToggleNavBar;
