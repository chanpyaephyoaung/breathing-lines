import { useState } from "react";
import { Link } from "react-router-dom";
import { generateLineBreakBtwSentences } from "../../../utils/text.jsx";
import { useIncreasePoemViewCountMutation } from "../../../slices/poemsApiSlice.js";
import { useIncreaseProfileViewCountMutation } from "../../../slices/usersApiSlice.js";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../../UI/Modal.jsx";
import { toast } from "react-toastify";
import TimeAgo from "javascript-time-ago";

const timeAgo = new TimeAgo("en-US");

const PoemPreviewPost = ({
   poemId,
   publishedAt,
   viewsCount,
   coverImg,
   bgTheme,
   title,
   author,
   content,
   originalAuthor,
   encodedCoverImg,
   onRemovePoemFromCollection,
   loadingRemovePoemFromCollection,
   isCurrentUserTheCollectionOwner,
}) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [increasePoemViewCount] = useIncreasePoemViewCountMutation();
   const [increaseProfileViewCount] = useIncreaseProfileViewCountMutation();

   const viewAuthorProfileHandler = async () => {
      try {
         await increaseProfileViewCount(author._id);
      } catch (err) {
         toast(err?.data?.errMessage || err.error);
      }
   };

   const viewMoreHandler = async () => {
      try {
         await increasePoemViewCount(poemId);
      } catch (err) {
         toast(err?.data?.errMessage || err.error);
      }
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const openModal = () => {
      setIsModalOpen(true);
   };

   const ctaHandler = () => {
      onRemovePoemFromCollection(poemId);
      closeModal();
   };

   return (
      <>
         {!loadingRemovePoemFromCollection && (
            <Modal
               isOpen={isModalOpen}
               closeModal={closeModal}
               desc="Are you sure you want to remove this poem from this collection?"
               confirmBtnText="Confirm"
               successFunc={ctaHandler}
            />
         )}
         <div className="relative grid gap-2 p-3 md:p-5 border border-clr-black">
            {isCurrentUserTheCollectionOwner && (
               <MinusCircleIcon
                  onClick={openModal}
                  className={`absolute -right-6 md:-right-10 w-[17px] md:w-[25px] stroke-[2] text-clr-primary cursor-pointer`}
               />
            )}
            {bgTheme?.id !== 1 && (
               <img
                  className="absolute top-0 left-0 -z-10 w-full max-h-full object-cover opacity-20"
                  src={bgTheme?.path}
                  alt={bgTheme?.name}
               />
            )}
            <div className="text-2xs md:text-xs w-full flex justify-between">
               <span>{timeAgo.format(new Date(publishedAt))}</span>
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
                  onClick={viewMoreHandler}
                  to={`/poem/${poemId}`}
                  className="transition-all block text-base md:text-xl font-medium hover:text-clr-primary"
               >
                  {title}
               </Link>
               <p className="text-xs md:text-sm text-clr-black-faded font-light">
                  By{" "}
                  <Link
                     onClick={viewAuthorProfileHandler}
                     to={`/user-profile/${author._id}`}
                     className="transition-all text-xs md:text-sm text-clr-black-faded font-light hover:text-clr-primary"
                  >
                     {originalAuthor || author.name}
                  </Link>
               </p>
            </div>

            <div className="line-clamp-4">
               <p className="text-xs md:text-base font-light">
                  {generateLineBreakBtwSentences(content)}
               </p>
            </div>

            <Link
               onClick={viewMoreHandler}
               to={`/poem/${poemId}`}
               className="transition-all justify-self-start text-xs font-light md:text-base text-clr-black-faded hover:text-clr-primary inline-block underline"
            >
               Breathe more
            </Link>
         </div>
      </>
   );
};
export default PoemPreviewPost;
