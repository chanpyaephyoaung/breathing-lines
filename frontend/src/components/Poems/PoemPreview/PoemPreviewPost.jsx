import { Link } from "react-router-dom";
import { generateLineBreakBtwSentences } from "../../../utils/text.jsx";

const PoemPreviewPost = ({
   id,
   datePosted,
   viewsCount,
   coverImg,
   title,
   author,
   content,
   encodedCoverImg,
}) => {
   console.log(encodedCoverImg);
   return (
      <div className="grid gap-2 p-3 md:p-5 border border-clr-black">
         <div className="text-2xs md:text-xs w-full flex justify-between">
            <span>{datePosted}</span>
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
               <span>{viewsCount} views</span>
            </span>
         </div>

         {coverImg && (
            <img
               className="w-full h-32 md:h-40 lg:h-60 object-cover"
               src={encodedCoverImg ? `data:image/jpeg;base64,${encodedCoverImg}` : coverImg}
               alt=""
            />
         )}

         <div className="grid -gap-1">
            <Link
               to={`poem/${id}`}
               className="transition-all block text-base md:text-xl font-medium hover:text-clr-primary"
            >
               {title}
            </Link>
            <a
               href=" "
               className="transition-all text-xs md:text-sm text-clr-black-faded font-light hover:text-clr-primary"
            >
               By {author}
            </a>
         </div>

         <div className="line-clamp-4">
            <p className="text-xs md:text-base font-light">
               {generateLineBreakBtwSentences(content)}
            </p>
         </div>

         <Link
            to={`poem/${id}`}
            preventScrollReset={true}
            className="transition-all justify-self-start text-xs font-light md:text-base text-clr-black-faded hover:text-clr-primary inline-block underline"
         >
            Breathe more
         </Link>
      </div>
   );
};
export default PoemPreviewPost;
