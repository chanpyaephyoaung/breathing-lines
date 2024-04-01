import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Poem from "../models/poemModel.js";
import AuthorProfileReview from "../models/authorProfileReviewModel.js";
import generateJwtToken from "../helpers/generateJwtToken.js";
import { s3RetrieveV3 } from "../s3Service.js";

// @desc    Authenticate user & get token
// @route   POST /api/users/signin
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (user && (await user.comparePassword(password))) {
      generateJwtToken(res, user._id);

      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      });
   } else {
      res.status(401);
      throw new Error("Invalid email or password!");
   }
});

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   const isUserExists = await User.findOne({ email });

   if (isUserExists) {
      res.status(400);
      throw new Error("User is already registered!");
   }

   const newUser = await User.create({
      name,
      email,
      password,
   });

   if (newUser) {
      generateJwtToken(res, newUser._id);

      res.status(201).json({
         _id: newUser._id,
         name: newUser.name,
         email: newUser.email,
         isAdmin: newUser.isAdmin,
      });
   } else {
      res.status(400);
      throw new Error("Invalid user form data!");
   }
});

// @desc    Sign out user & remove cookie
// @route   POST /api/users/signout
// @access  Private
export const signOutUser = asyncHandler(async (req, res) => {
   res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
   });

   res.status(200).json({ message: "Signed out successfully!" });
});

// @desc    Get user account profile details
// @route   GET /api/users/user-profile/:userId
// @access  Private
export const getUserAccProfile = asyncHandler(async (req, res) => {
   const targetUser = await User.findById(req.params.userId);

   let image = "";

   if (targetUser?.profileImg) {
      const result = await s3RetrieveV3(targetUser.profileImg);
      image = await result.Body?.transformToString("base64");
   }

   if (targetUser && targetUser.profileReviews.length > 0) {
      const targetUserWithProfileReviews = await targetUser.populate({
         path: "profileReviews",
         select: "review reviewedAt reviewedBy",
         populate: {
            path: "reviewedBy",
            select: "name",
         },
      });

      res.status(200).json({
         targetUser: targetUserWithProfileReviews,
         encodedProfileImage: image,
      });
   } else if (targetUser && targetUser.profileReviews.length === 0) {
      res.status(200).json({ targetUser, encodedProfileImage: image });
   } else {
      res.status(404);
      throw new Error("Current user not found!");
   }
});

// @desc    Update user profile details
// @route   PUT /api/users/user-profile/:userId
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
   const currentUser = await User.findById(req.currentUser._id);

   if (currentUser) {
      currentUser.name = req.body.newProfileData.name || currentUser.name;
      currentUser.profileImg = req.body.newProfileData.profileImg || currentUser.profileImg;
      currentUser.profileDesc = req.body.newProfileData.profileDesc || currentUser.profileDesc;

      const updatedCurrentUser = await currentUser.save();

      res.status(200).json(updatedCurrentUser);
   } else {
      res.status(404);
      throw new Error("Profile update unsuccessful. User not found.");
   }
});

// @desc    Update user account profile details
// @route   PUT /api//user-profile/account/update
// @access  Private
export const updateUserAccProfile = asyncHandler(async (req, res) => {
   const currentUser = await User.findById(req.currentUser._id);

   if (currentUser) {
      currentUser.email = req.body.email || currentUser.email;

      if (req.body.password) {
         currentUser.password = req.body.password;
      }

      const updatedCurrentUser = await currentUser.save();

      res.status(200).json({
         _id: updatedCurrentUser._id,
         isAdmin: updatedCurrentUser.isAdmin,
         name: currentUser.name,
         email: updatedCurrentUser.email,
      });
   } else {
      res.status(404);
      throw new Error("Account update unsuccessful. User not found.");
   }
});

// @desc    Leave a profile review on other author's profile
// @route   POST /api/users/:userId/profile-review
// @access  Private
export const createAuthorProfileReview = asyncHandler(async (req, res) => {
   const userId = req.params.userId;
   const { review } = req.body;

   const targetUser = await User.findById(userId);
   const currentUser = req.currentUser._id;

   const alreadyReviewed = await AuthorProfileReview.findOne({ reviewedBy: currentUser });

   if (!alreadyReviewed) {
      // Create and save new review
      const newReview = new AuthorProfileReview({
         review,
         reviewedAt: new Date(),
         reviewedBy: currentUser,
         reviewedFor: userId,
      });
      const savedReview = await newReview.save();

      // Add and save the review to the author's profileReviews array
      targetUser.profileReviews.push(savedReview._id);
      await targetUser.save();

      res.status(201).json({ message: "Profile Review added successfully!" });
   } else {
      res.status(400);
      throw new Error("You have already made a review on this poem!");
   }
});

// @desc    Increase a user views count
// @route   PUT /api/users/:userId/view
// @access  Private
export const increaseViewCount = asyncHandler(async (req, res) => {
   const { userId } = req.body;
   const targetUser = await User.findById(userId);
   const currentUser = req.currentUser._id;
   if (targetUser) {
      // Increase the view count only if the user is anonymous(not signed-in) or not the current user itself
      if (!currentUser || currentUser !== userId) {
         targetUser.profileViewsCount += 1;
         await targetUser.save();
         res.status(200).json({ message: "View count increased!" });
      } else {
         res.status(200).json({ message: "View count not increased!" });
      }
   } else {
      res.status(404);
      throw new Error("User not found!");
   }
});

// @desc    Increase a user views count
// @route   PUT /api/users/:userId/view
// @access  Private
export const subscribeUser = asyncHandler(async (req, res) => {
   const targetUserId = req.params.userId;
   const currentUserId = req.currentUser._id;

   if (targetUserId === currentUserId) {
      res.status(400);
      throw new Error("You cannot subscribe to yourself!");
   }

   const targetUser = await User.findById(targetUserId);
   const currentUser = await User.findById(currentUserId);

   if (targetUser) {
      if (targetUser.followers.includes(currentUserId)) {
         // Remove the current user from the target user's followers array
         const newTargetUserFollowers = targetUser.followers.filter(
            (user) => user.toString() !== currentUserId.toString()
         );
         targetUser.followers = newTargetUserFollowers;

         // Remove the target user from the current user's following array
         const newCurrentUserFollowing = currentUser.followings.filter(
            (user) => user.toString() !== targetUserId.toString()
         );
         currentUser.followings = newCurrentUserFollowing;

         await targetUser.save();
         await currentUser.save();
         res.status(200).json({ message: `You have now unfollowed ${targetUser.name}.` });
      } else {
         // Add the current user to the target user's followers array
         targetUser.followers.push(currentUserId);
         // Add the target user to the current user's followings array
         currentUser.followings.push(targetUserId);

         await targetUser.save();
         await currentUser.save();
         res.status(200).json({ message: `You have now followed ${targetUser.name}.` });
      }
   } else {
      res.status(404);
      throw new Error("User not found!");
   }
});

// @desc    Fetch all poems of a specific user
// @route   GET /api/user-profile/:userId/poems/:status
// @access  Public
export const getAllPoemsOfUser = asyncHandler(async (req, res) => {
   const currentUserId = req.currentUser._id;
   const { status } = req.params;
   let poems = [];
   if (status === "drafted") {
      poems = await Poem.find({ author: currentUserId, status: "drafted" }).populate(
         "author",
         "name"
      );
   } else if (status === "published") {
      poems = await Poem.find({ author: currentUserId, status: "published" }).populate(
         "author",
         "name"
      );
   }
   res.json(poems);
});
