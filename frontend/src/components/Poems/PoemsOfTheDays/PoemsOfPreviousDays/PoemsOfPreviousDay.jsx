import { Link } from "react-router-dom";
import { generatePoemContentMarkup } from "../../../../utils/poemUtils.jsx";

const PoemsOfPreviousDay = ({ poem }) => {
   return (
      <div className="grid gap-y-1 pb-2 border-b border-clr-black-faded">
         <p className="text-sm text-clr-tertiary font-medium">Yesterday</p>
         <Link
            to={`poem/${poem.id}`}
            className="transition-all text-lg font-medium text-clr-black hover:text-clr-tertiary"
         >
            {poem.title}
         </Link>
         <p className="text-sm -mt-1.5 text-clr-black-faded font-light">
            By <a href=" ">{poem.author}</a>
         </p>
         <p className="text-base font-light line-clamp-1">
            {generatePoemContentMarkup(poem.content)}
         </p>
      </div>
   );
};
export default PoemsOfPreviousDay;
