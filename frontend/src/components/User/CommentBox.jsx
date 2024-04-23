import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import TimeAgo from "javascript-time-ago";
import { UserIcon } from "@heroicons/react/24/outline";
import LoaderSpinner from "../UI/LoaderSpinner.jsx";
import Modal from "../UI/Modal.jsx";
import {
   useEditPoemReviewMutation,
   useDeletePoemReviewMutation,
} from "../../slices/poemsApiSlice.js";
import { toast } from "react-toastify";

const timeAgo = new TimeAgo("en-US");

const CommentBox = ({ review, type }) => {
   const { poemId } = useParams();
   const { userAccInfo } = useSelector((state) => state.authUser);

   const [updatedReview, setUpdatedReview] = useState();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [ctaType, setCtaType] = useState("");
   const [modalDesc, setModalDesc] = useState("");

   const [editPoemReview, { isLoading: loadingEditPoemReview }] = useEditPoemReviewMutation();
   const [deletePoemReview, { isLoading: loadingDeletePoemReview }] = useDeletePoemReviewMutation();

   useEffect(() => {
      if (review) setUpdatedReview(review.review);
   }, [review]);

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const openModal = () => {
      setIsModalOpen(true);
   };

   const updatePoemReviewHandler = () => {
      setCtaType("updatePoemReview");
      setModalDesc("Do you really wish to save the changes?");
      openModal();
   };

   const deletePoemReviewHandler = () => {
      setCtaType("deletePoemReview");
      setModalDesc("Do you really wish to delete this poem review?");
      openModal();
   };

   const ctaHandler = async () => {
      try {
         if (ctaType === "updatePoemReview") {
            await editPoemReview({
               poemId,
               updatedReview,
            });
            toast.success("Poem updated successfully!");
            closeModal();
         } else if (ctaType === "deletePoemReview") {
            const res = await deletePoemReview(poemId).unwrap();
            toast.success(res.message);
            closeModal();
         }
      } catch (err) {
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   return (
      <>
         <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
            desc={modalDesc}
            confirmBtnText="Confirm"
            successFunc={ctaHandler}
         >
            {ctaType === "updatePoemReview" && (
               <label className="relative text-xs grid justify-items-start gap-y-2 mb-4">
                  <span className="sr-only">Review</span>
                  <p className="text-sm font-medium">Review</p>
                  <div className="justify-self-stretch relative">
                     <input
                        className={`placeholder:text-clr-black-faded text-sm py-3 md:py-3 pl-4 pr-4 block bg-clr-white w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                        placeholder="review"
                        type="text"
                        name="name"
                        value={updatedReview}
                        onChange={(e) => setUpdatedReview(e.target.value)}
                     />
                  </div>
               </label>
            )}
            {loadingEditPoemReview && <LoaderSpinner />}
         </Modal>
         <div
            className={`grid ${
               type === "large"
                  ? "grid-cols-[40px_1fr] md:grid-cols-[45px_1fr] gap-x-4 pb-3"
                  : "grid-cols-[35px_1fr] gap-x-2 pb-2"
            } gap-y-2 border-b border-1 border-clr-black-faded`}
         >
            {review?.encodedProfileImg ? (
               <img
                  src={`data:image/jpeg;base64,${review.encodedProfileImg}`}
                  alt="user profile"
                  className={`${
                     type === "large"
                        ? "w-[40px] h-[40px] md:w-[45px] md:h-[45px]"
                        : "w-[35px] h-[35px]"
                  } rounded-full border border-clr-black object-cover row-start-1`}
               />
            ) : (
               <div className="grid row-start-1 place-items-center w-9 h-10 md:w-10 md:h-10 text-xs rounded-full border-2 border-clr-black-faded">
                  <UserIcon className="w-8 h-8 md:w-8 md:h-8 text-xs rounded-full text-clr-black-faded" />
               </div>
            )}
            <div className="flex row-start-1 justify-between items-center">
               <div className="flex flex-wrap gap-x-2 items-center">
                  <Link className="transition-all text-clr-black hover:text-clr-primary font-regular text-xs md:text-base cursor-pointer">
                     {review.reviewedBy.name}
                  </Link>
                  <p className="text-clr-black-faded text-2xs md:text-xs">
                     {timeAgo.format(new Date(review.reviewedAt))}
                  </p>
               </div>
               {userAccInfo?._id.toString() === review.reviewedBy._id.toString() && (
                  <div className="flex gap-x-4 items-center">
                     <PencilSquareIcon
                        onClick={updatePoemReviewHandler}
                        className={`w-[15px] md:w-[20px] stroke-[1] hover:text-clr-primary cursor-pointer`}
                     />

                     <TrashIcon
                        onClick={deletePoemReviewHandler}
                        className={`w-[15px] md:w-[20px] stroke-[1] hover:text-clr-primary cursor-pointer`}
                     />
                  </div>
               )}
            </div>

            <p className="row-start-2 col-start-2 text-clr-black font-light text-xs md:text-base -mt-2 md:-mt-3 text-left">
               {review.review}
            </p>
         </div>
      </>
   );
};
export default CommentBox;
