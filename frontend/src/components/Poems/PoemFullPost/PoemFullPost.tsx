import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { generatePoemContentMarkup } from "../../../utils/poemUtils.tsx";
import { ArrowUturnLeftIcon, EyeIcon, TagIcon } from "@heroicons/react/24/outline";
import PoemPostInteractionBar from "./PoemPostInteractionBar.tsx";
import OverlayBgBlur from "../../UI/OverlayBgBlur.tsx";
import { useGetPoemDetailsQuery } from "../../../slices/poemsApiSlice.ts";

const PoemFullPost = () => {
   const { poemId } = useParams();

   const { data: poem, isLoading, error } = useGetPoemDetailsQuery(poemId);

   let errorMsg: string | undefined = "";

   if (error) {
      if ("status" in error) {
         // you can access all properties of `FetchBaseQueryError` here
         errorMsg = "error" in error ? error.error : JSON.stringify(error.data);
      } else {
         // you can access all properties of `SerializedError` here
         errorMsg = error.message;
      }
   }

   return (
      <>
         {isLoading ? (
            <h2>Loading...</h2>
         ) : error ? (
            <h2>{errorMsg}</h2>
         ) : (
            <>
               <OverlayBgBlur />
               <div className="w-full md:w-[80%] md:max-w-4xl h-screen md:h-[95vh] z-[60] fixed top-0 left-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 grid items-center bg-clr-bg md:border md:border-1 md:border-clr-black md:rounded-md">
                  <Link
                     to="/"
                     className="w-6 md:w-7 absolute top-4 left-4 text-clr-black stroke-[0.7] cursor-pointer"
                  >
                     <ArrowUturnLeftIcon />
                  </Link>
                  <div className="h-[70%] overflow-y-scroll -mt-20 w-5/6 px-10 pb-2 mx-auto">
                     <div className="text-2xs md:text-xs text-clr-black flex justify-between items-center mb-1">
                        <p>{poem?.date ? new Date(poem.date).toDateString() : ""}</p>
                        <p className="flex gap-x-1 items-center">
                           <EyeIcon className="w-4 h-4 md:w-5 md:h-5 text-clr-black" />{" "}
                           {poem?.viewsCount} views
                        </p>
                     </div>

                     <img
                        className="w-full h-65 object-cover border border-1 border-clr-black"
                        src={poem?.coverImg}
                        alt=""
                     />

                     <div className="text-clr-black mt-4 grid justify-items-center max-w-[85%] mx-auto ">
                        <div className="grid justify-items-start text-clr-black">
                           <div className="">
                              <h2 className="text-lg md:text-2xl font-semibold break-words">
                                 {poem?.title}
                              </h2>
                              <p className="text-xs md:text-sm font-light">By {poem?.author}</p>
                           </div>
                           <div className="mt-3">
                              <p className="text-xs md:text-base font-light whitespace-pre-line">
                                 {generatePoemContentMarkup(poem?.content)}
                              </p>
                           </div>
                           <div className="flex gap-2 items-center mt-3">
                              <TagIcon className="w-4 md:w-5 text-clr-black-faded" />
                              <p className="text-2xs md:text-xs font-extralight">
                                 {poem?.tags.join(", ")}
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="w-full absolute bottom-0 z-10">
                     <PoemPostInteractionBar poem={poem} />
                  </div>
               </div>
            </>
         )}
      </>
   );
};
export default PoemFullPost;
