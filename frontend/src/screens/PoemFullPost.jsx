import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import {
   TagIcon,
   HeartIcon,
   StarIcon,
   PencilSquareIcon,
   TrashIcon,
} from "@heroicons/react/24/outline";
import {
   EyeIcon as SolidEyeIcon,
   HeartIcon as SolidHeartIcon,
   ChatBubbleLeftRightIcon as SolidChatBubbleLeftRightIcon,
   SparklesIcon as SolidSparklesIcon,
} from "@heroicons/react/24/solid";
import { useGetSinglePoemByIdQuery } from "../slices/poemsApiSlice.js";
import Container from "../components/UI/Container.jsx";
import CommentBox from "../components/User/CommentBox.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import Rating from "react-rating";
import Modal from "../components/UI/Modal.jsx";
import ToggleSwitch from "../components/UI/ToggleSwitch.jsx";
import { toast } from "react-toastify";
import {
   useLikePoemMutation,
   useRatePoemMutation,
   useReviewPoemMutation,
   useDeletePoemMutation,
   useChangePoemStatusMutation,
} from "../slices/poemsApiSlice.js";
import {
   useGetCollectionsOfUserQuery,
   useAddPoemToCollectionMutation,
} from "../slices/collectionApiSlice.js";
import {
   useCreateNewNotificationMutation,
   useUpdateUnreadNotiCountMutation,
} from "../slices/usersApiSlice.js";
import { useIncreaseProfileViewCountMutation } from "../slices/usersApiSlice.js";
import { calculateAverage } from "../utils/math.js";
import { POEM_WRITE_STATUS_DRAFT, POEM_WRITE_STATUS_PUBLISH } from "../constants.js";
import AddToCollectionComboBox from "../components/Collection/AddToCollectionComboBox.jsx";
import TimeAgo from "javascript-time-ago";

const timeAgo = new TimeAgo("en-US");

const emptyStarIcon = (
   <StarIcon className="transition-all w-[35px] md:w-[45px] text-clr-black stroke-[0.6] cursor-pointer" />
);

const fullStarIcon = (
   <StarIcon className="transition-all w-[35px] md:w-[45px] text-clr-black stroke-[0.6] cursor-pointer fill-clr-primary" />
);

const PoemFullPost = () => {
   const socket = useOutletContext();
   const navigate = useNavigate();
   const { userAccInfo } = useSelector((state) => state.authUser);

   const { poemId } = useParams();
   const [isLiked, setIsLiked] = useState(false);
   const [initialRating, setInitialRating] = useState(0);
   const [averageRating, setAverageRating] = useState(0);
   const [reviewInput, setReviewInput] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalCtaType, setModalCtaType] = useState("");
   const [modalDesc, setModalDesc] = useState("");
   const [confirmBtnText, setConfirmBtnText] = useState("Confirm");
   const [discardBtnText, setDiscardBtnText] = useState("No");
   const [selectedCollection, setSelectedCollection] = useState(null);

   const [likePoem] = useLikePoemMutation();
   const [ratePoem] = useRatePoemMutation();
   const [reviewPoem] = useReviewPoemMutation();
   const [increaseProfileViewCount] = useIncreaseProfileViewCountMutation();

   const { data: poem, isLoading, error, refetch } = useGetSinglePoemByIdQuery(poemId);
   const [deletePoem, { isLoading: loadingDeletePoem }] = useDeletePoemMutation();
   const [addPoemToCollection, { isLoading: loadingAddPoemToCollection }] =
      useAddPoemToCollectionMutation();
   const [changePoemStatus, { isLoading: loadingChangePoemStatus }] = useChangePoemStatusMutation();
   const [createNewNotification] = useCreateNewNotificationMutation();
   const [updateUnreadNotiCount] = useUpdateUnreadNotiCountMutation();
   const { data: collections } = useGetCollectionsOfUserQuery(userAccInfo?._id);

   const isCurrentUserTheAuthor = userAccInfo?._id.toString() === poem?.author._id.toString();
   const [poemStatusSwitchEnabled, setPoemStatusSwitchEnabled] = useState(false);

   const changeSelectedCollectionHandler = (collection) => {
      setSelectedCollection(collection);
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const openModal = () => {
      setIsModalOpen(true);
   };

   const deleteBtnHandler = () => {
      setModalCtaType("delete");
      setModalDesc("Are you sure you want to delete this poem? This action cannot be undone.");
      openModal();
   };

   const changePoemStatusBtnHandler = () => {
      setModalCtaType("changePoemStatus");
      setModalDesc("Are you sure you want to change the status of this poem?");
      openModal();
   };

   const addPoemToCollectionBtnHandler = () => {
      setSelectedCollection(collections[0]);
      setModalCtaType("addPoemToCollection");
      setModalDesc("Add this poem to your collection.");
      setConfirmBtnText("Add");
      setDiscardBtnText("Discard");
      openModal();
   };

   // Create a notification
   const createNotification = async (currentUserId, targetUserId, notiMessage, notiType) => {
      // Do not create a notification if the current user is the target userr(e.g. author)
      if (currentUserId.toString() === targetUserId.toString()) return;

      await createNewNotification({
         userId: currentUserId,
         newNotiData: {
            createdBy: currentUserId,
            receivedBy: targetUserId,
            notificationMessage: notiMessage,
            notificationType: notiType,
            createdAt: new Date(),
         },
      });
      return await updateUnreadNotiCount({
         userId: targetUserId,
      }).unwrap();
   };

   // Modal Handler Funcs
   const modalSuccessFuncHandler = async () => {
      try {
         // Delete a poem on confirmation
         if (modalCtaType === "delete") {
            await deletePoem(poemId);
            toast.success("Poem deleted successfully!");
            navigate(`/user-profile/${userAccInfo._id}/poems`);
         }
         // Change poem status on confirmation
         else if (modalCtaType === "changePoemStatus") {
            await changePoemStatus({
               poemId,
               newPoemStatus:
                  poem?.status === POEM_WRITE_STATUS_DRAFT
                     ? POEM_WRITE_STATUS_PUBLISH
                     : POEM_WRITE_STATUS_DRAFT,
            });
            setPoemStatusSwitchEnabled((prevState) => !prevState);
            toast.success("Poem status updated successfully!");
         } else if (modalCtaType === "addPoemToCollection") {
            const res = await addPoemToCollection({
               userId: userAccInfo._id,
               poemId,
               collectionId: selectedCollection._id,
            }).unwrap();
            toast.success(res.message);
         }
         closeModal();
         refetch();
      } catch (err) {
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   // Like a poem
   const likePoemHandler = async () => {
      try {
         setIsLiked((prevState) => !prevState);
         await likePoem(poemId);
         if (!isLiked) {
            const unreadNotiCountOfUser = await createNotification(
               userAccInfo?._id,
               poem?.author?._id,
               `${userAccInfo?.name} liked your poem "${poem?.title}!"`,
               "like"
            );

            // Emitting socket event for liking a poem
            socket.emit("sendLikePoemNotification", {
               unreadNotiCount: unreadNotiCountOfUser,
               author: poem?.author?._id,
            });
         }
         refetch();
      } catch (err) {
         toast(err?.data?.errMessage || err.error);
      }
   };

   // Rate a poem
   const ratingChangeHandler = async (value) => {
      try {
         setInitialRating(value);
         // Calculating average rating
         setAverageRating(calculateAverage(poem.ratings.map((rating) => rating.rating)));
         await ratePoem({ poemId, rating: value });

         const unreadNotiCountOfUser = await createNotification(
            userAccInfo?._id,
            poem?.author?._id,
            `${userAccInfo?.name} gave your poem "${poem.title}" a rating of ${value}!`,
            "rate"
         );

         // Emitting socket event for rating a poem
         socket.emit("sendRatePoemNotification", {
            unreadNotiCount: unreadNotiCountOfUser,
            author: poem?.author?._id,
         });
         refetch();
      } catch (err) {
         toast(err?.data?.errMessage || err.error);
      }
   };

   // Review a poem
   const createReviewSubmitHandler = async (e) => {
      e.preventDefault();
      try {
         const res = await reviewPoem({ poemId, review: reviewInput }).unwrap();
         toast.success(res.message);
         const unreadNotiCountOfUser = await createNotification(
            userAccInfo?._id,
            poem?.author?._id,
            `${userAccInfo?.name} reviewed your poem "${poem.title}"`,
            "review"
         );

         // Emitting socket event for rating a poem
         socket.emit("sendReviewPoemNotification", {
            unreadNotiCount: unreadNotiCountOfUser,
            author: poem?.author?._id,
         });
         refetch();
         setReviewInput("");
      } catch (err) {
         setReviewInput("");
         toast(err?.data?.errMessage || err.error);
      }
   };

   // Increase a profile view count
   const increaseProfileViewsCountHandler = async () => {
      try {
         await increaseProfileViewCount(poem.author._id);
         navigate(`/user-profile/${poem.author._id}`);
      } catch (err) {
         toast(err?.data?.errMessage || err.error);
      }
   };

   useEffect(() => {
      if (poem) {
         const alreadyLiked = poem?.likes.find(
            (user) => user.toString() === userAccInfo?._id.toString()
         );
         const isPoemPublished = poem?.status === POEM_WRITE_STATUS_PUBLISH;
         setPoemStatusSwitchEnabled(isPoemPublished);
         if (alreadyLiked) {
            setIsLiked(true);
         }
         const currentRating = poem?.ratings.find((rating) => rating.ratedBy === userAccInfo?._id);
         if (currentRating) {
            setInitialRating(currentRating?.rating);
         }
         // Calculating average rating
         setAverageRating(calculateAverage(poem.ratings.map((rating) => rating.rating)));
      }
   }, [poem, userAccInfo?._id]);

   return (
      <>
         {!loadingDeletePoem && !loadingChangePoemStatus && !loadingAddPoemToCollection && (
            <Modal
               isOpen={isModalOpen}
               closeModal={closeModal}
               desc={modalDesc}
               confirmBtnText={confirmBtnText}
               discardBtnText={discardBtnText}
               successFunc={modalSuccessFuncHandler}
            >
               {modalCtaType === "addPoemToCollection" && (
                  <AddToCollectionComboBox
                     collections={collections}
                     onChangeSelectedCollection={changeSelectedCollectionHandler}
                  />
               )}
            </Modal>
         )}
         {isLoading ||
         loadingDeletePoem ||
         loadingChangePoemStatus ||
         loadingAddPoemToCollection ? (
            <Container>
               <LoaderSpinner />
            </Container>
         ) : error ? (
            <Container>
               <Message type="danger">{error?.data?.message || error.error}</Message>
            </Container>
         ) : (
            <Container>
               <div className="w-full relative overflow-y-hidden">
                  <div className="w-4/5 max-w-[450px] grid justify-items-start mx-auto gap-y-6 text-clr-black mb-8">
                     {poem?.bgTheme?.id !== 1 && poem.bgTheme && (
                        <img
                           className="absolute top-0 left-0 -z-10 w-full overflow-y-hidden opacity-20"
                           src={poem?.bgTheme?.path}
                           alt={poem?.bgTheme?.name}
                        />
                     )}
                     {isCurrentUserTheAuthor && (
                        <>
                           <div className="w-full flex justify-between">
                              <div className="transition-all text-clr-black cursor-pointer hover:text-clr-primary hover:stroke-clr-primary">
                                 <Link
                                    to={`/user/${poem.author._id}/poem/${poemId}/edit`}
                                    className="flex items-center gap-x-2 text-xs md:text-sm font-regular"
                                 >
                                    <PencilSquareIcon
                                       className={`w-[15px] md:w-[20px] stroke-[1]`}
                                    />
                                    Edit
                                 </Link>
                              </div>

                              <div className="transition-all text-clr-black cursor-pointer hover:text-clr-primary hover:stroke-clr-primary">
                                 <Link
                                    onClick={deleteBtnHandler}
                                    className="flex items-center gap-x-2 text-xs md:text-sm font-regular"
                                 >
                                    <TrashIcon className={`w-[15px] md:w-[20px] stroke-[1]`} />
                                    Delete
                                 </Link>
                              </div>
                           </div>
                           <div className="w-full border-t border-clr-black-light -mt-2"></div>
                        </>
                     )}
                     <div className="w-full grid grid-cols-[1fr_35px] md:grid-cols-[1fr_45px]">
                        <div className="grid gap-y-1 text-left grid-start-1">
                           <h2 className="text-lg md:text-2xl font-semibold break-words leading-7">
                              {poem?.title}
                           </h2>
                           <Link
                              to={`/user-profile/${poem.author._id}`}
                              onClick={increaseProfileViewsCountHandler}
                              className="text-clr-black text-xs md:text-sm font-regular"
                           >
                              By{" "}
                              <span className="transition-all hover:text-clr-primary">
                                 {poem?.author.name}
                              </span>
                           </Link>
                        </div>
                        {userAccInfo && poem?.status !== POEM_WRITE_STATUS_DRAFT && (
                           <div className="grid-start-2">
                              <HeartIcon
                                 onClick={likePoemHandler}
                                 className={`transition-all w-[35px] md:w-[45px] text-clr-black stroke-[0.6] ${
                                    isLiked ? "fill-clr-primary text-clr-black stroke-0" : ""
                                 } cursor-pointer hover:stroke-clr-primary hover:fill-clr-primary`}
                              />
                           </div>
                        )}
                     </div>
                     {poem.coverImg && (
                        <img
                           className="w-full max-h-[350px] h-65 object-cover border border-1 border-clr-black"
                           src={
                              poem.encodedCoverImg
                                 ? `data:image/jpeg;base64,${poem.encodedCoverImg}`
                                 : poem?.coverImg
                           }
                           alt={`${poem?.title} cover image`}
                        />
                     )}
                     <p className="text-xs md:text-base font-light whitespace-pre-line">
                        {poem?.content}
                     </p>
                     <p className="text-2xs md:text-xs text-clr-black font-light">
                        Published Time: {timeAgo.format(new Date(poem?.publishedAt))}
                     </p>
                     <div className="flex gap-2 items-center">
                        <TagIcon className="w-4 md:w-5 text-clr-black-faded" />
                        <p className="text-2xs md:text-xs text-clr-black font-light">
                           {poem?.genres.join(", ")}
                        </p>
                     </div>
                     <div className="w-full flex flex-col items-start gap-y-4 md:flex-row md:items-center md:justify-between">
                        {userAccInfo && poem?.status !== POEM_WRITE_STATUS_DRAFT && (
                           <div className="flex">
                              <button
                                 type="button"
                                 onClick={addPoemToCollectionBtnHandler}
                                 className="justify-self-start text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                              >
                                 &#43; Add to collection
                              </button>
                           </div>
                        )}
                        {isCurrentUserTheAuthor && (
                           <div
                              onClick={changePoemStatusBtnHandler}
                              className="pl-5 md:pl-0 md:ml-auto"
                           >
                              <ToggleSwitch label="Published" enabled={poemStatusSwitchEnabled} />
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               {poem?.status !== POEM_WRITE_STATUS_DRAFT && (
                  <>
                     <div className="grid grid-cols-2 md:flex md:flex-row md:justify-between gap-y-4 border-t-[1px] border-clr-black-faded p-4 md:p-x-8 md:p-x-4 md:py-12">
                        <div className="flex gap-x-4">
                           <SolidEyeIcon className="transition-all w-[45px] md:w-[55px] text-clr-black-light stroke-[1.5] hover:text-clr-black" />
                           <div className="grid items-center">
                              <span className="inline-block text-xl md:text-3xl font-light leading-none">
                                 {poem?.viewsCount}
                              </span>
                              <span className="text-sm md:text-base font-light -mt-1">views</span>
                           </div>
                        </div>

                        <div className="flex gap-x-4">
                           <SolidHeartIcon className="transition-all w-[45px] md:w-[55px] text-clr-black-light stroke-[1.5] hover:text-clr-primary" />
                           <div className="grid items-center">
                              <span className="inline-block text-xl md:text-3xl font-light leading-none">
                                 {poem?.likesCount}
                              </span>
                              <span className="text-sm md:text-base font-light -mt-1">loves</span>
                           </div>
                        </div>

                        <div className="flex gap-x-4">
                           <SolidChatBubbleLeftRightIcon className="transition-all w-[45px] md:w-[55px] text-clr-black-light stroke-[1.5] hover:text-clr-tertiary" />
                           <div className="grid items-center">
                              <span className="inline-block text-xl md:text-3xl font-light leading-none">
                                 {poem?.reviews.length}
                              </span>
                              <span className="text-sm md:text-base font-light -mt-1">
                                 comments
                              </span>
                           </div>
                        </div>

                        <div className="flex gap-x-4">
                           <SolidSparklesIcon className="transition-all w-[45px] md:w-[55px] text-clr-black-light stroke-[1.5] hover:text-clr-secondary" />
                           <div className="grid items-center">
                              <span className="inline-block text-xl md:text-3xl font-light leading-none">
                                 {averageRating || 0}
                              </span>
                              <span className="text-sm md:text-base font-light -mt-1">ratings</span>
                           </div>
                        </div>
                     </div>
                     <div className="grid gap-y-6 border-t-[1px] border-clr-black-faded p-4 md:p-x-8 md:p-x-4 md:py-12">
                        <p className="flex gap-x-2 text-clr-black text-base md:text-2xl font-medium">
                           Ratings & Review
                        </p>
                        {!userAccInfo ? (
                           // Render content when userAccInfo is not available
                           <Message type="danger">
                              Please sign in to rate and review this poem.
                           </Message>
                        ) : userAccInfo.isBanned ? (
                           <Message type="danger">
                              You are banned from rating and reviewing poems. Please contact the
                              admin for more information.
                           </Message>
                        ) : userAccInfo._id !== poem.author._id ? (
                           // Render content when userAccInfo is available but user is not the author of the poem
                           <>
                              <div className="grid justify-start text-center gap-x-6">
                                 <Rating
                                    initialRating={initialRating}
                                    onChange={ratingChangeHandler}
                                    emptySymbol={emptyStarIcon}
                                    fullSymbol={fullStarIcon}
                                 />
                                 <p className="text-sm text-clr-black">Rate this poem</p>
                              </div>
                              <form
                                 onSubmit={createReviewSubmitHandler}
                                 className="w-full grid md:grid-cols-[3fr_2fr] gap-x-8 gap-y-4"
                              >
                                 <label className="relative text-xs grid justify-items-start gap-y-2">
                                    <span className="sr-only">write a review</span>
                                    <div className="justify-self-stretch relative">
                                       <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>

                                       <input
                                          className={`w-4/5 md:w-full placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-4 md:pl-4 pr-3 block bg-clr-bg border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                                          placeholder="Tell us what you think of this poem..."
                                          type="text"
                                          name="poemReview"
                                          onChange={(e) => setReviewInput(e.target.value)}
                                          value={reviewInput}
                                       />
                                    </div>
                                 </label>
                                 <button
                                    type="submit"
                                    className="justify-self-start text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                                 >
                                    Write a review
                                 </button>
                              </form>
                           </>
                        ) : (
                           // Render content when userAccInfo is available and user is the author of the poem
                           <Message type="danger">You cannot rate or review your own poem.</Message>
                        )}
                     </div>

                     <div className="grid gap-y-6 border-t-[1px] border-clr-black-faded p-4 md:p-x-8 md:p-x-4 md:py-8">
                        <p className="flex gap-x-2 text-clr-black text-base md:text-2xl font-medium">
                           Community Reviews
                           <span>({poem.reviews.length})</span>
                        </p>
                        <div className="grid gap-y-4">
                           {poem.reviews.map((review) => (
                              <CommentBox
                                 key={review._id}
                                 review={review}
                                 type="large"
                                 author={poem.author._id}
                              ></CommentBox>
                           ))}
                        </div>
                     </div>
                  </>
               )}
            </Container>
         )}
      </>
   );
};
export default PoemFullPost;
