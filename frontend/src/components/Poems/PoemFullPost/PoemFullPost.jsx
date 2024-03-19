import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { TagIcon, HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import {
   EyeIcon as SolidEyeIcon,
   HeartIcon as SolidHeartIcon,
   ChatBubbleLeftRightIcon as SolidChatBubbleLeftRightIcon,
   SparklesIcon as SolidSparklesIcon,
} from "@heroicons/react/24/solid";
import { useGetSinglePoemByIdQuery } from "../../../slices/poemsApiSlice.js";
import Container from "../../UI/Container.jsx";
import CommentBox from "../../User/CommentBox.jsx";
import LoaderSpinner from "../../UI/LoaderSpinner.jsx";
import Message from "../../Typography/Message.jsx";
import Rating from "react-rating";
import { toast } from "react-toastify";
import {
   useLikePoemMutation,
   useRatePoemMutation,
   useReviewPoemMutation,
} from "../../../slices/poemsApiSlice.js";
import { calculateAverage } from "../../../utils/math.js";

const emptyStarIcon = (
   <StarIcon className="transition-all w-[35px] md:w-[45px] text-clr-black stroke-[0.6] cursor-pointe" />
);

const fullStarIcon = (
   <StarIcon className="transition-all w-[35px] md:w-[45px] text-clr-black stroke-[0.6] cursor-pointer fill-clr-secondary" />
);

const dummyReview = {
   reviewedBy: {
      name: "Bastita",
   },
   review: "This is a great poem. I love it.",
   reviewedAt: new Date(),
};

const PoemFullPost = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);

   const { poemId } = useParams();
   const [isLiked, setIsLiked] = useState(false);
   const [initialRating, setInitialRating] = useState(0);
   const [averageRating, setAverageRating] = useState(0);
   const [reviewInput, setReviewInput] = useState("");

   const [likePoem] = useLikePoemMutation();
   const [ratePoem] = useRatePoemMutation();
   const [reviewPoem] = useReviewPoemMutation();
   const { data: poem, isLoading, error, refetch } = useGetSinglePoemByIdQuery(poemId);

   // Like a poem
   const likePoemHandler = async () => {
      try {
         setIsLiked((prevState) => !prevState);
         await likePoem(poemId);
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
         refetch();
      } catch (err) {
         console.log("ERROR ", err);
         toast(err?.data?.errMessage || err.error);
      }
   };

   // Review a poem
   const createReviewSubmitHandler = async (e) => {
      e.preventDefault();
      try {
         const res = await reviewPoem({ poemId, review: reviewInput }).unwrap();
         toast(res.message);
         refetch();
         setReviewInput("");
      } catch (err) {
         setReviewInput("");
         toast(err?.data?.errMessage || err.error);
      }
   };

   useEffect(() => {
      if (poem) {
         const alreadyLiked = poem?.likes.find(
            (user) => user.toString() === userAccInfo?._id.toString()
         );
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
         {isLoading ? (
            <Container>
               <LoaderSpinner />
            </Container>
         ) : error ? (
            <Container>
               <Message type="danger">{error?.data?.message || error.error}</Message>
            </Container>
         ) : (
            <>
               <Container>
                  <div className="w-4/5 max-w-[450px] grid justify-items-start mx-auto gap-y-6 text-clr-black mb-8">
                     <div className="w-full grid grid-cols-[1fr_35px] md:grid-cols-[1fr_45px]">
                        <div className="grid gap-y-1 text-left grid-start-1">
                           <h2 className="text-lg md:text-2xl font-semibold break-words leading-7">
                              {poem?.title}
                           </h2>
                           <p className="text-xs md:text-sm font-regular">By {poem?.author.name}</p>
                        </div>
                        <div className="grid-start-2">
                           <HeartIcon
                              onClick={likePoemHandler}
                              className={`transition-all w-[35px] md:w-[45px] text-clr-black stroke-[0.6] ${
                                 isLiked ? "fill-clr-primary text-clr-black stroke-0" : ""
                              } cursor-pointer hover:stroke-clr-primary hover:fill-clr-primary`}
                           />
                        </div>
                     </div>
                     {poem.coverImg && (
                        <img
                           className="max-h-[350px] h-65 object-cover border border-1 border-clr-black"
                           src={poem?.coverImg}
                           alt=""
                        />
                     )}
                     <p className="text-xs md:text-base font-light whitespace-pre-line">
                        {poem?.content}
                     </p>
                     <p className="text-2xs md:text-xs text-clr-black font-light">
                        {poem?.publishedAt}
                     </p>
                     <div className="flex gap-2 items-center">
                        <TagIcon className="w-4 md:w-5 text-clr-black-faded" />
                        <p className="text-2xs md:text-xs text-clr-black font-light">
                           {poem?.genres.join(", ")}
                        </p>
                     </div>
                     {userAccInfo && (
                        <button
                           type="button"
                           className="justify-self-start text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                        >
                           &#43; Add to collection
                        </button>
                     )}
                  </div>

                  <div className="grid grid-cols-2 md:flex md:flex-row md:justify-between gap-y-4 border-t-[1px] border-clr-black-faded p-4 md:p-x-8 md:p-x-4 md:py-12">
                     <div className="flex gap-x-4">
                        <SolidEyeIcon className="transition-all w-[45px] md:w-[55px] text-clr-black-light stroke-[1.5] hover:text-clr-black" />
                        <div className="grid items-center">
                           <span className="inline-block text-xl md:text-3xl font-light leading-none">
                              40
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
                              10
                           </span>
                           <span className="text-sm md:text-base font-light -mt-1">comments</span>
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
                        <span>(4)</span>
                     </p>
                     <div className="grid gap-y-4">
                        <CommentBox review={dummyReview} type="large"></CommentBox>
                        <CommentBox review={dummyReview} type="large"></CommentBox>
                     </div>
                     <button
                        type="button"
                        className="justify-self-center text-xs py-3 px-5 md:text-sm text-clr-primary font-medium border border-clr-primary rounded-full hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                     >
                        View all comments
                     </button>
                  </div>
               </Container>
            </>
         )}
      </>
   );
};
export default PoemFullPost;
