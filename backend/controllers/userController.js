import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
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
// @route   PUT /api/users/account-profile
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
// @route   PUT /api/users/account-profile
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
