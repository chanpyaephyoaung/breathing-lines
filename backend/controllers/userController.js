import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc    Authenticate user & get token
// @route   POST /api/users/signin
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (user && (await user.comparePassword(password))) {
      const jwtToken = jwt.sign(
         {
            userId: user._id,
         },
         process.env.JWT_SECRET,
         {
            expiresIn: "10d",
         }
      );

      // Set JWT as HTTP-Only Cookie
      res.cookie("jwt", jwtToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      });

      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      });
   } else {
      res.status(401);
      throw new Error("Invalid email or password!");
   }

   res.send("Auth user!");
});

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
   res.send("Register user!");
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
   res.send("Get user profile!");
});

// @desc    Update user account profile details
// @route   PUT /api/users/profile
// @access  Private
export const updateUserAccProfile = asyncHandler(async (req, res) => {
   res.send("Update user profile!");
});
