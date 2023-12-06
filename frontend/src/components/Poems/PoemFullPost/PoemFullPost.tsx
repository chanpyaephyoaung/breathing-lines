import React from "react";
import {
   ArrowUturnLeftIcon,
   EyeIcon,
   TagIcon,
   HeartIcon,
   ChatBubbleBottomCenterTextIcon,
   ArrowUturnRightIcon,
   PlusIcon,
   StarIcon,
} from "@heroicons/react/24/outline";
import PoemPostInteractionBar from "./PoemPostInteractionBar.tsx";

const PoemFullPost = () => {
   return (
      <>
         <div className="hidden fixed top-0 left-0 w-full h-screen bg-clr-black/30">&nbsp;</div>
         <div className="w-full  h-screen  z-[60] absolute   grid items-center bg-clr-bg s">
            <ArrowUturnLeftIcon className="w-7 absolute top-4 left-4 text-clr-black stroke-[0.7] cursor-pointer" />
            <div className="h-[70%] overflow-y-scroll -mt-20 w-5/6 px-10 pb-2 mx-auto">
               <div className="text-2xs  text-clr-black flex justify-between items-center mb-1">
                  <p>Nov 5,2023</p>
                  <p className="flex gap-x-1 items-center">
                     <EyeIcon className="w-4 h-4 text-clr-black" /> 500 views
                  </p>
               </div>

               <img
                  className="w-full h-65 object-cover border border-1 border-clr-black"
                  src="https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
               />

               <div className="text-clr-black mt-4 grid justify-items-center max-w-[85%] mx-auto ">
                  <div className="grid justify-items-start">
                     <div className="">
                        <h2 className="text-lg font-semibold break-words">Tears In Heaven</h2>
                        <p className="text-xs">By Eric Clapton</p>
                     </div>
                     <div className="mt-3">
                        <p className="text-xs font-light">
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
                        <TagIcon className="w-4 text-clr-black-faded" />
                        <p className="text-2xs font-extralight">Nature, Love, Romance</p>
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
