import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import AuthorProfileReview from "../models/authorProfileReviewModel.js";
import generateJwtToken from "../helpers/generateJwtToken.js";

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
// @route   GET /api/users/profile
// @access  Public
export const getUserAccProfile = asyncHandler(async (req, res) => {
   const currentUser = await User.findById(req.currentUser._id).populate({
      path: "profileReviews",
      select: "review reviewedAt reviewedBy",
      populate: {
         path: "reviewedBy",
         select: "name",
      },
   });

   console.log(currentUser.profileReviews[0].reviewedBy);

   if (currentUser) {
      res.status(200).json(currentUser);
   } else {
      res.status(404);
      throw new Error("Current user not found!");
   }
});

// @desc    Update user account profile details
// @route   PUT /api/users/profile
// @access  Private
export const updateUserAccProfile = asyncHandler(async (req, res) => {
   const currentUser = await User.findById(req.currentUser._id);

   if (currentUser) {
      currentUser.name = req.body.name || currentUser.name;
      currentUser.email = req.body.email || currentUser.email;

      if (req.body.password) {
         currentUser.password = req.body.password;
      }

      const updatedCurrentUser = await currentUser.save();

      res.status(200).json({
         _id: updatedCurrentUser._id,
         isAdmin: updatedCurrentUser.isAdmin,
         name: updatedCurrentUser.name,
         email: updatedCurrentUser.email,
      });
   } else {
      res.status(404);
      throw new Error("Profile update unsuccessful. User not found.");
   }
});
