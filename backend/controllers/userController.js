import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Authenticate user & get token
// @route   POST /api/users/signin
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
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
   res.send("Sign out user!");
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
