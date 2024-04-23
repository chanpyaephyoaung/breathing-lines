import { Link } from "react-router-dom";
import { generateLineBreakBtwSentences } from "../../../../utils/text.jsx";

const PoemsOfPreviousDay = ({ poem, label }) => {
   return (
      <div className="grid gap-y-1 pb-2 border-b border-clr-black-faded">
         <p className="text-sm text-clr-tertiary font-medium">{label}</p>
         <Link
            to={`poem/${poem?.poem?._id}`}
            className="transition-all text-lg font-medium text-clr-black hover:text-clr-tertiary"
         >
            {poem?.poem?.title}
         </Link>
         <p className="text-sm -mt-1.5 text-clr-black-faded font-light">
            By{" "}
            <Link
               className="transition-all hover:text-clr-tertiary"
               to={`/user-profile/${poem?.poem?.author._id}`}
            >
               {poem?.poem?.originalAuthor || poem?.poem?.author?.name}
            </Link>
         </p>
         <p className="text-base font-light line-clamp-1">
            {generateLineBreakBtwSentences(poem?.poem?.content)}
         </p>
      </div>
   );
};
export default PoemsOfPreviousDay;
