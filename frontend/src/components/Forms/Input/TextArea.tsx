import React from "react";

const TextArea = ({ label }) => {
   return (
      <div className="grid gap-y-2 text-left">
         <span className="sr-only">{label}</span>
         <label htmlFor="about" className="block text-base font-medium">
            {label}
         </label>

         <textarea
            id="about"
            name="about"
            rows={7}
            className="py-3 pl-4 pr-4 placeholder:text-clr-bg-faded block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-5"
         ></textarea>
      </div>
   );
};
export default TextArea;
