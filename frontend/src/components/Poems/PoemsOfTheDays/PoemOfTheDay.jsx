import { Link } from "react-router-dom";
import { generateLineBreakBtwSentences } from "../../../utils/text.jsx";
import { useIncreaseProfileViewCountMutation } from "../../../slices/usersApiSlice.js";
import { useIncreasePoemViewCountMutation } from "../../../slices/poemsApiSlice.js";

import { toast } from "react-toastify";

const PoemOfTheDay = ({ poem }) => {
   console.log(poem);
   const [increaseProfileViewCount] = useIncreaseProfileViewCountMutation();
   const [increasePoemViewCount] = useIncreasePoemViewCountMutation();

   const viewAuthorProfileHandler = async () => {
      try {
         await increaseProfileViewCount(poem.poem.author._id);
      } catch (err) {
         toast(err?.data?.errMessage || err.error);
      }
   };

   const viewMoreHandler = async () => {
      try {
         await increasePoemViewCount(poem.poem._id);
      } catch (err) {
         toast(err?.data?.errMessage || err.error);
      }
   };
   return (
      <div className="w-full">
         <div className="w-4/6 mx-auto md:w-full md:mx-0">
            <div className="w-full flex gap-2 items-center md:gap-4">
               <h2 className="text-xl md:text-3xl lg:text-4xl text-clr-tertiary font-semibold">
                  Poem of the Day
               </h2>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 md:w-10 md:h-10 text-clr-tertiary"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                  />
               </svg>
            </div>

            <div className="grid mt-3 md:justify-between">
               <div className="grid pr-3 gap-3">
                  <div className="grid -gap-1">
                     <Link
                        onClick={viewMoreHandler}
                        to={`poem/${poem?.poem?._id}`}
                        className="transition-all block text-base md:text-xl lg:text-2xl text-clr-black hover:text-clr-tertiary font-medium"
                     >
                        {poem?.poem?.title}
                     </Link>
                     <Link
                        onClick={viewAuthorProfileHandler}
                        to={`/user-profile/${poem?.poem?.author._id}`}
                        className="text-xs md:text-sm lg:text-base text-clr-black-faded font-light"
                     >
                        By{" "}
                        <span className="transition-all hover:text-clr-tertiary">
                           {poem?.poem?.originalAuthor || poem?.poem?.author?.name}
                        </span>
                     </Link>
                  </div>

                  <div>
                     <p className="text-xs md:text-base font-light line-clamp-4">
                        {generateLineBreakBtwSentences(poem?.poem?.content)}
                     </p>
                  </div>

                  <Link
                     onClick={viewMoreHandler}
                     to={`poem/${poem?.poem?._id}`}
                     className="transition-all justify-self-start text-xs md:text-base text-clr-tertiary hover:text-clr-black inline-block underline"
                  >
                     View
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};
export default PoemOfTheDay;
