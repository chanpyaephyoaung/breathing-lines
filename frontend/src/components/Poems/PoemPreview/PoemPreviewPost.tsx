import React from "react";

const PoemPreviewPost = () => {
   return (
      <div className="grid gap-2 p-3 md:p-5 border border-clr-black">
         <div className="text-2xs md:text-xs w-full flex justify-between">
            <span>Nov 5, 2023</span>
            <span className="flex gap-1">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 md:w-4"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
               </svg>
               <span>500 views</span>
            </span>
         </div>

         <img
            className="w-full h-32 md:h-40 lg:h-60 object-cover"
            src="https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg"
            alt="sky"
         />

         <div className="grid -gap-1">
            <a href=" " className="block text-base md:text-xl font-medium">
               Tears In Heaven
            </a>
            <a href=" " className="text-xs md:text-sm text-clr-black-faded font-light">
               By Eric Clapton
            </a>
         </div>

         <div className="line-clamp-4">
            <p className="text-xs md:text-base font-light">
               Would you know my name?
               <br />
               If I saw you in heaven
               <br />
               Would it be the same?
               <br />
               If I saw you in heaven
            </p>
         </div>

         <a
            href=" "
            className="transition-all justify-self-start text-xs font-light md:text-base text-clr-black-faded hover:text-clr-primary inline-block underline"
         >
            Breathe more
         </a>
      </div>
   );
};
export default PoemPreviewPost;
