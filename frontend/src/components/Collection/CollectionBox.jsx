import { Link, useNavigate } from "react-router-dom";

const CollectionBox = ({ collectionId, userId, name }) => {
   const navigate = useNavigate();

   const clickHandler = () => {
      navigate(`/user-profile/${userId}/collections/${collectionId}`);
   };

   return (
      <div
         onClick={clickHandler}
         className="transition-all w-full max-w-[400px] mx-auto p-2 md:p-4 text-clr-black border border-1 border-clr-black cursor-pointer hover:bg-clr-primary hover:text-clr-white hover:underline"
      >
         <div className="flex items-center justify-center gap-x-4">
            <Link className="text-sm md:text-lg font-regular">{name}</Link>
         </div>
      </div>
   );
};
export default CollectionBox;
