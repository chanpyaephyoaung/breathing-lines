import React from "react";
import SearchForm from "../Forms/SearchForm.tsx";

const SubMenu = ({ userType }) => {
   return (
      <div className="flex width-full justify-between items-center">
         <ul className="flex list-none font-light text-xs [&>li:not(:first-child)]:border-l [&>li:not(:first-child)]:border-clr-black">
            <li className="py-[0.5] px-1.5">
               <a href=" ">Home</a>
            </li>
            {userType === "user" && (
               <>
                  <li className="py-[0.5] px-1.5">
                     <a href=" ">Latest</a>
                  </li>
                  <li className="py-[0.5] px-1.5">
                     <a href=" ">Write</a>
                  </li>
               </>
            )}
         </ul>

         <SearchForm />
      </div>
   );
};
export default SubMenu;
