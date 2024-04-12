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

// @desc    Ban a user
// @route   PUT /api/users/admin/:userId/ban
// @access  Private | Admin
export const banUserByAdmin = asyncHandler(async (req, res) => {
   const targetUserId = req.body.userId;
   const targetUser = await User.findById(targetUserId);
   targetUser.isBanned = !targetUser.isBanned;
   await targetUser.save();
   res.status(201).json({
      message: targetUser.isBanned ? "User banned successfully" : "User unbanned successfully!",
   });
});
