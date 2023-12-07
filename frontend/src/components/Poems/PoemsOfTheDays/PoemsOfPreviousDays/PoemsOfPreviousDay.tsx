import React from "react";

const PoemsOfPreviousDay = () => {
   return (
      <div className="grid gap-y-1 pb-2 border-b border-clr-black-faded">
         <p className="text-sm text-clr-tertiary font-medium">Yesterday</p>
         <a
            href=" "
            className="transition-all text-lg font-medium text-clr-black hover:text-clr-tertiary"
         >
            Tears In Heaven
         </a>
         <p className="text-sm -mt-1.5 text-clr-black-faded font-light">
            By <a href=" ">Eric Clapton</a>
         </p>
         <p className="text-base font-light">Would you know my name?</p>
      </div>
   );
};
export default PoemsOfPreviousDay;
