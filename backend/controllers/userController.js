import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateJwtToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (user && (await user.matchPassword(password))) {
      generateJwtToken(res, user._id);

      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         poems: user.poems,
      });
   } else {
      res.status(401);
      throw new Error("Invalid email or password");
   }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   const userExists = await User.findOne({ email });

   if (userExists) {
      res.status(400);
      throw new Error("User already exists!");
   }

   const user = await User.create({
      name,
      email,
      password,
   });

   if (user) {
      generateJwtToken(res, user._id);

      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         poems: user.poems,
      });
   }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
   res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0), //expire right away
   });

   res.status(200).json({ message: "You are now logged out!" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Public
const getUserProfile = asyncHandler(async (req, res) => {
   res.send("get user profile");
});

export { authUser, registerUser, logoutUser, getUserProfile };
