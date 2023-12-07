import React from "react";

const Input = ({ label, type, placeholder = "", size, showLabel, children }) => {
   const inputSmClasses = "text-xs md:text-base py-2 md:py-3 pl-8 md:pl-12 pr-3";
   const inputLgClasses = "text-base py-3 pl-12 pr-3";
   const defaultInputClasses = "text-sm md:text-base py-3 md:py-3 pl-4 pr-4";

   return (
      <label className="relative text-xs grid justify-items-start gap-y-2">
         <span className="sr-only">{label}</span>
         {showLabel && <p className="capitalize text-base font-medium">{label}</p>}
         <div className="justify-self-stretch relative">
            {placeholder && (
               <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-5 h-5 text-clr-black-faded"
                  >
                     {children}
                  </svg>
               </span>
            )}

            <input
               className={`${
                  size === "sm"
                     ? inputSmClasses
                     : size === "lg"
                     ? inputLgClasses
                     : defaultInputClasses
               } placeholder:text-clr-bg-faded block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
               placeholder={placeholder || ""}
               type={type}
               name={label}
            />
         </div>
      </label>
   );
};
export default Input;
