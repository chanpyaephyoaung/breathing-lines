import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Get all users
// @route   GET /api/users/admin/usersList
// @access  Private | Admin
export const getAllUsersByAdmin = asyncHandler(async (req, res) => {
   const pageSize = process.env.PAGINATION_SIZE;
   const page = Number(req.query.pageNum) || 1;

   const count = await User.countDocuments({});
   const allUsers = await User.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));

   res.status(200).json({ allUsers, page, pages: Math.ceil(count / pageSize) });
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
