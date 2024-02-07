import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Get all users
// @route   GET /api/users/admin
// @access  Private | Admin
export const getAllUsersByAdmin = asyncHandler(async (req, res) => {
   res.send("Get all users by admin!");
});

// @desc    Get a single user by ID
// @route   GET /api/users/admin/:userId
// @access  Private | Admin
export const getSingleUserById = asyncHandler(async (req, res) => {
   res.send("Get a single user by admin!");
});

// @desc    Delete a user
// @route   DELETE /api/users/admin/:userId
// @access  Private | Admin
export const deleteUserByAdmin = asyncHandler(async (req, res) => {
   res.send("Delete a user by admin!");
});

// @desc    Update a user
// @route   PUT /api/users/admin/:userId
// @access  Private | Admin
export const updateUserByAdmin = asyncHandler(async (req, res) => {
   res.send("Update a user by admin!");
});
