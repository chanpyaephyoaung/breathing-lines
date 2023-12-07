import React from "react";
import { ArrowUturnLeftIcon, EyeIcon, TagIcon } from "@heroicons/react/24/outline";
import PoemPostInteractionBar from "./PoemPostInteractionBar.tsx";
import OverlayBgBlur from "../../UI/OverlayBgBlur.tsx";

const PoemFullPost = () => {
   return (
      <>
         <OverlayBgBlur />
         <div className="w-full md:w-[80%] md:max-w-4xl h-screen md:h-[80vh] z-[60] fixed top-0 left-0 md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 grid items-center bg-clr-bg md:border md:border-1 md:border-clr-black md:rounded-md">
            <ArrowUturnLeftIcon className="w-6 md:w-7 absolute top-4 left-4 text-clr-black stroke-[0.7] cursor-pointer" />
            <div className="h-[70%] overflow-y-scroll -mt-20 w-5/6 px-10 pb-2 mx-auto">
               <div className="text-2xs md:text-xs text-clr-black flex justify-between items-center mb-1">
                  <p>Nov 5, 2023</p>
                  <p className="flex gap-x-1 items-center">
                     <EyeIcon className="w-4 h-4 md:w-5 md:h-5 text-clr-black" /> 500 views
                  </p>
               </div>

               <img
                  className="w-full h-65 object-cover border border-1 border-clr-black"
                  src="https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
               />

               <div className="text-clr-black mt-4 grid justify-items-center max-w-[85%] mx-auto ">
                  <div className="grid justify-items-start text-clr-black">
                     <div className="">
                        <h2 className="text-lg md:text-2xl font-semibold break-words">
                           Tears In Heaven
                        </h2>
                        <p className="text-xs md:text-sm font-light">By Eric Clapton</p>
                     </div>
                     <div className="mt-3">
                        <p className="text-xs md:text-base font-light">
                           Would you know my name?
                           <br />
                           If I saw you in heaven?
                           <br />
                           Would it be the same?
                           <br />
                           If I saw you in heaven
                           <br />
                           <br />
                           I must be strong
                           <br />
                           And carry on <br />
                           'Cause I know I don't belong
                           <br />
                           Here in heaven
                           <br />
                           <br />
                           Would you hold my hand?
                           <br />
                           If I saw you in heaven
                           <br />
                           Would you help me stand?
                           <br />
                           If I saw you in heaven
                        </p>
                     </div>
                     <div className="flex gap-2 items-center mt-3">
                        <TagIcon className="w-4 md:w-5 text-clr-black-faded" />
                        <p className="text-2xs md:text-xs font-extralight">Nature, Love, Romance</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="w-full absolute bottom-0 z-10">
               <PoemPostInteractionBar />
            </div>
         </div>
      </>
   );
};
export default PoemFullPost;
