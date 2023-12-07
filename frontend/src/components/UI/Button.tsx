import React from "react";

const Button = ({ type, size, children, customStyle }) => {
   const btnSmClasses = "text-xs py-2 px-5 md:text-base md:py-3 md:px-5";
   const btnLgClasses = "text-sm py-3 px-5 md:text-base";

   const btnPrimaryStyle =
      " text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1";
   const btnSecondaryStyle =
      " text-clr-tertiary font-medium border border-clr-tertiary rounded-lg hover:bg-clr-tertiary hover:text-clr-white focus:outline-none focus:border-clr-tertiary focus:ring-clr-tertiary focus:ring-1";
   const btnBlackStyle =
      " text-clr-black font-medium border border-clr-black rounded-lg hover:bg-clr-black hover:text-clr-white focus:outline-none focus:border-clr-black focus:ring-clr-black focus:ring-1";

   return (
      <button
         type={type}
         className={`${size === "sm" ? btnSmClasses : size === "lg" ? btnLgClasses : ""} ${
            customStyle === "primary"
               ? btnPrimaryStyle
               : customStyle === "secondary"
               ? btnSecondaryStyle
               : customStyle === "black"
               ? btnBlackStyle
               : " "
         } transition duration-300 leading-none`}
      >
         {children}
      </button>
   );
};
export default Button;
