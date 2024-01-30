import { XMarkIcon } from "@heroicons/react/24/outline";

const ToggleNavBar = ({ onHideMainNav, showMainNav }) => {
   const handleMainNavClick = (e) => {
      e.preventDefault();
      onHideMainNav();
   };

   return (
      <div
         className={`transition-all ${
            showMainNav ? "opacity-100 visible z-[100]" : "opacity-0 invisible"
         } w-full h-screen overflow-hidden bg-clr-bg fixed top-0 left-0`}
      >
         <a onClick={handleMainNavClick} href=" ">
            <XMarkIcon className="w-9 h-9 md:w-11 md:h-11 text-clr-black stroke-[0.7] absolute right-4 top-4" />
         </a>

         <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 p-2">
            <ul className="grid gap-14 list-none uppercase text-2xl md:text-3xl font-extralight tracking-normal">
               <li className="cursor-pointer">
                  <a
                     className="inline-block transition-transform md:hover:scale-110 md:hover:translate-x-2 md:hover:font-normal md:hover:text-clr-primary"
                     href=" "
                  >
                     Search
                  </a>
               </li>
               <li className="cursor-pointer">
                  <a
                     className="inline-block transition-transform md:hover:scale-110 md:hover:translate-x-2 md:hover:font-normal md:hover:text-clr-primary"
                     href=" "
                  >
                     Genres
                  </a>
               </li>
               <li className="cursor-pointer">
                  <a
                     className="inline-block transition-transform md:hover:scale-110 md:hover:translate-x-2 md:hover:font-normal md:hover:text-clr-primary"
                     href=" "
                  >
                     About
                  </a>
               </li>
               <li className="cursor-pointer">
                  <a
                     className="inline-block transition-transform md:hover:scale-110 md:hover:translate-x-2 md:hover:font-normal md:hover:text-clr-primary"
                     href=" "
                  >
                     FAQ
                  </a>
               </li>
               <li className="cursor-pointer">
                  <a
                     className="inline-block transition-transform md:hover:scale-110 md:hover:translate-x-2 md:hover:font-normal md:hover:text-clr-primary"
                     href=" "
                  >
                     Contact
                  </a>
               </li>
            </ul>
         </nav>
      </div>
   );
};
export default ToggleNavBar;
