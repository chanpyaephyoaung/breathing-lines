import asyncHandler from "../middleware/asyncHandler.js";
import Poem from "../models/poemModel.js";
import User from "../models/userModel.js";
import PoemRating from "../models/poemRatingModel.js";
import PoemReview from "../models/poemReviewModel.js";
import PoemOfTheDay from "../models/poemOfTheDayModel.js";
import { s3RetrieveV3 } from "../s3Service.js";

// @desc    Fetch all poems
// @route   GET /api/poems
// @access  Public
export const getAllPoems = asyncHandler(async (req, res) => {
   const keyword = req.query.keyword
      ? {
           title: {
              $regex: req.query.keyword,
              $options: "i",
           },
        }
      : {};
   const poems = await Poem.find({ ...keyword, status: "published" }).populate("author", "name");

   const poemsWithEncodedCoverImg = await Promise.all(
      poems.map(async (poem, i) => {
         let image = "";
         if (poem?.coverImg && i === 29) {
            // Just for testing purpose. Remove the second condition in production
            const result = await s3RetrieveV3(poem.coverImg);
            image = await result.Body?.transformToString("base64");
         }
         return { ...poem._doc, encodedCoverImg: image };
      })
   );
   res.json(poemsWithEncodedCoverImg);
});

// @desc    Fetch a single poem by ID
// @route   GET /api/poems/:poemId
// @access  Public
export const getSinglePoemById = asyncHandler(async (req, res) => {
   const targetPoem = await Poem.findById(req.params.poemId)
      .populate("author", "name")
      .populate("ratings", "ratedBy rating")
      .populate({
         path: "reviews",
         select: "review reviewedBy reviewedAt",
         populate: {
            path: "reviewedBy",
            select: "name profileImg",
         },
      });

   let image = "";

   if (targetPoem?.coverImg && targetPoem.coverImg.startsWith("uploads/")) {
      const result = await s3RetrieveV3(targetPoem.coverImg);
      image = await result.Body?.transformToString("base64");
   }

   const poemWithUserProfileImgs = await Promise.all(
      targetPoem.reviews.map(async (review) => {
         let profileImg = "";
         if (review.reviewedBy.profileImg) {
            const result = await s3RetrieveV3(review.reviewedBy.profileImg);
            profileImg = await result.Body?.transformToString("base64");
         }
         return { ...review._doc, encodedProfileImg: profileImg };
      })
   );

   if (targetPoem) {
      // return res.json(targetPoem);
      return res.json({
         ...targetPoem._doc,
         encodedCoverImg: image,
         reviews: poemWithUserProfileImgs,
      });
   } else {
      res.status(404);
      throw new Error("Poem not found!");
   }
});

// @desc    Fetch poems of followed users
// @route   GET /api/poems/followings
// @access  Private
export const getAllPoemsOfFollowingUsers = asyncHandler(async (req, res) => {
   const currentUserId = req.currentUser._id;
   const currentUser = await User.findById(currentUserId).populate("followings"); // Populate the followings field

   // Get IDs of users that the current user follows
   const followingUserIds = currentUser.followings;

   // Find poems of followed users
   const poemsOfFollowedUsers = await Poem.find({ author: { $in: followingUserIds } })
      .populate("author", "name")
      .sort({ publishedAt: -1 }); // Sort by publishedAt in descending order to get the latest poems first

   const poemsWithEncodedCoverImg = await Promise.all(
      poemsOfFollowedUsers.map(async (poem, i) => {
         let image = "";
         if (poem?.coverImg && i === 29) {
            // Just for testing purpose. Remove the second condition in production
            const result = await s3RetrieveV3(poem.coverImg);
            image = await result.Body?.transformToString("base64");
         }
         return { ...poem._doc, encodedCoverImg: image };
      })
   );

   res.json(poemsWithEncodedCoverImg);
});

// @desc    Write a poem
// @route   POST /api/poems/write
// @access  Private
export const writePoem = asyncHandler(async (req, res) => {
   const currentUser = await User.findById(req.currentUser._id);
   if (currentUser.isBanned) {
      res.status(403);
      throw new Error("You are banned from writing poems.");
   }

   const { title, content, bgTheme, coverImg, status, genres } = req.body;

   const newPoem = new Poem({
      title,
      content,
      author: req.currentUser._id,
      coverImg,
      bgTheme,
      status,
      genres,
   });

   const savedPoem = await newPoem.save();

   // Add the poem to the user's poems field
   currentUser.poems.push(savedPoem._id);

   await currentUser.save();

   res.status(201).json(savedPoem);
});

// @desc    Update poem
// @route   PUT /api/poems/:poemId/edit
// @access  Private
export const editPoem = asyncHandler(async (req, res) => {
   const currentPoem = await Poem.findById(req.params.poemId);

   if (currentPoem) {
      currentPoem.title = req.body.newPoemData.title || currentPoem.title;
      currentPoem.content = req.body.newPoemData.content || currentPoem.content;
      currentPoem.coverImg = req.body.newPoemData.coverImg || currentPoem.coverImg;
      currentPoem.genres = req.body.newPoemData.genres || currentPoem.genres;
      currentPoem.bgTheme = req.body.newPoemData.bgTheme || currentPoem.bgTheme || "";

      const updatedCurrentPoem = await currentPoem.save();

      res.status(200).json(updatedCurrentPoem);
   } else {
      res.status(404);
      throw new Error("Poem update unsuccessful. Poem not found.");
   }
});

// @desc    Update poem status
// @route   PUT /api/poems/:poemId/change-status
// @access  Private
export const changePoemStatus = asyncHandler(async (req, res) => {
   const currentPoem = await Poem.findById(req.params.poemId);

   if (currentPoem) {
      currentPoem.status = req.body.newPoemStatus;

      const updatedCurrentPoem = await currentPoem.save();

      res.status(200).json({ message: `Poem ${updatedCurrentPoem.status} successfully.` });
   } else {
      res.status(404);
      throw new Error("Poem status update unsuccessful. Poem not found.");
   }
});

// @desc    Delete poem
// @route   DELETE /api/poems/:poemId
// @access  Private
export const deletePoem = asyncHandler(async (req, res) => {
   const currentPoem = await Poem.findById(req.params.poemId);

   if (currentPoem) {
      await Poem.deleteOne({ _id: currentPoem._id });
      res.status(200).json({ message: "Poem deleted successfully." });
   } else {
      res.status(404);
      throw new Error("Poem update unsuccessful. Poem not found.");
   }
});

// @desc    Like a poem
// @route   PUT /api/poems/:poemId/like
// @access  Private
export const likePoem = asyncHandler(async (req, res) => {
   const poemId = req.params.poemId;

   // Retrieve the current poem
   const poem = await Poem.findById(poemId);

   // Retrieve the current user
   const currentUser = await User.findById(req.currentUser._id);

   if (poem) {
      const alreadyLiked = poem.likes.find(
         (user) => user.toString() === req.currentUser._id.toString()
      );

      if (!alreadyLiked) {
         // Increase the likes count
         poem.likesCount += 1;
         // Add the user to the likes array
         poem.likes.push(req.currentUser._id);

         // Add the poem to the user's favoritedPoems field
         currentUser.favoritedPoems.push(poemId);
      } else {
         // Decrease the likes count
         poem.likesCount -= 1;
         // Remove the user from the likes array
         poem.likes = poem.likes.filter(
            (user) => user.toString() !== req.currentUser._id.toString()
         );

         // Remove the poem from the user's favoritedPoems field
         currentUser.favoritedPoems = currentUser.favoritedPoems.filter(
            (poem) => poem.toString() !== poemId
         );
      }

      // Save updated poem
      const updatedPoem = await poem.save();
      // Save updated user
      await currentUser.save();

      res.status(200).json(updatedPoem);
   } else {
      res.status(404);
      throw new Error("Poem not found!");
   }
});

// @desc    Rate a poem
// @route   PUT /api/poems/:poemId/rate
// @access  Private
export const ratePoem = asyncHandler(async (req, res) => {
   const currentUserId = req.currentUser._id;
   const currentUser = await User.findById(currentUserId);

   if (currentUser.isBanned) {
      res.status(403);
      throw new Error("You are banned from writing poems.");
   }

   const poemId = req.params.poemId;
   const { rating } = req.body;

   const poem = await Poem.findById(poemId);

   const currentRating = await PoemRating.findOne({ ratedBy: currentUserId });

   if (!currentRating) {
      // Create and save new rating
      const newRating = new PoemRating({
         rating,
         ratedAt: new Date(),
         ratedBy: currentUserId,
         ratedPoem: poemId,
      });
      const savedRating = await newRating.save();

      // Add and save the rating to the poem's ratings array
      poem.ratings.push(savedRating._id);
      await poem.save();

      res.status(201).json(savedRating);
   } else {
      // Update the existing rating and save
      currentRating.rating = rating;
      await currentRating.save();
      res.status(200).json(currentRating);
   }
});

// @desc    Create a review for a poem
// @route   POST /api/poems/:poemId/review
// @access  Private
export const createPoemReview = asyncHandler(async (req, res) => {
   const currentUserId = req.currentUser._id;
   const currentUser = await User.findById(currentUserId);

   if (currentUser.isBanned) {
      res.status(403);
      throw new Error("You are banned from writing poems.");
   }
   const poemId = req.params.poemId;
   const { review } = req.body;

   const poem = await Poem.findById(poemId);

   const poemReview = await PoemReview.findOne({ reviewedBy: currentUserId, reviewedPoem: poemId });
   const alreadyReviewed = poem.reviews.find(
      (review) => review?._id?.toString() === poemReview?._id?.toString()
   );

   if (!alreadyReviewed) {
      // Create and save new review
      const newReview = new PoemReview({
         review,
         reviewedAt: new Date(),
         reviewedBy: currentUserId,
         reviewedFor: poem.author,
         reviewedPoem: poemId,
      });
      const savedReview = await newReview.save();

      // Add and save the review to the poem's ratings array
      poem.reviews.push(savedReview._id);
      await poem.save();

      res.status(201).json({ message: "Review added successfully!" });
   } else {
      res.status(400);
      throw new Error("You have already made a review on this poem!");
   }
});

// @desc    Increase a poem's views count
// @route   PUT /api/poems/:poemId/view
// @access  Private
export const increaseViewCount = asyncHandler(async (req, res) => {
   const { poemId } = req.body;
   const poem = await Poem.findById(poemId);
   const currentUser = req.currentUser._id;
   if (poem) {
      // Increase the view count only if the user is anonymous(not signed-in) or not the author of the poem
      if (!currentUser || currentUser !== poem.author) {
         poem.viewsCount += 1;
         await poem.save();
         res.status(200).json({ message: "View count increased!" });
      } else {
         res.status(200).json({ message: "View count not increased!" });
      }
   } else {
      res.status(404);
      throw new Error("Poem not found!");
   }
});

// @desc    Fetch 3 previous poems of the day including today's
// @route   GET /api/poems/poemsOfTheDays
// @access  Public
export const getPoemsOfTheDay = asyncHandler(async (req, res) => {
   // Query the database for the latest 3 documents sorted by the awardedAt field in descending order
   const latestPoemsOfTheDay = await PoemOfTheDay.find({})
      .populate({
         path: "poem",
         select: "title author publishedAt content",
         populate: {
            path: "author",
            select: "name",
         },
      })
      .sort({ awardedAt: -1 })
      .limit(3);

   res.status(200).json(latestPoemsOfTheDay);
});
