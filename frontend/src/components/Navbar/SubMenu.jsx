import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchForm from "../Forms/SearchForm.jsx";

const SubMenu = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);
   return (
      <div className="w-full bg-clr-bg ">
         <div className="border-b border-clr-black border-1 px-6 flex md:w-4/5 max-w-[1100px] mx-auto py-4 justify-between items-center">
            <ul className="flex list-none font-light text-xs md:text-base [&>li:not(:first-child)]:border-l [&>li:not(:first-child)]:border-clr-black [&>li:not(:first-child)]:px-1.5 md:[&>li:not(:first-child)]:px-2.5">
               <li className="pr-1.5 md:pr-2.5">
                  <Link to="/" className="transition-all hover:text-clr-primary">
                     For You
                  </Link>
               </li>
               {userAccInfo && (
                  <>
                     <li>
                        <Link to="/latest" className="transition-all hover:text-clr-primary">
                           Latest
                        </Link>
                     </li>
                     <li>
                        <Link to="/write" className="transition-all hover:text-clr-primary">
                           Write
                        </Link>
                     </li>
                  </>
               )}
            </ul>

            <SearchForm />
         </div>
      </div>
   );
};
export default SubMenu;
