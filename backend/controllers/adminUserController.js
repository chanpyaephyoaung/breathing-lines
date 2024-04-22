import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Poem from "../models/poemModel.js";
import PoemOfTheDay from "../models/poemOfTheDayModel.js";

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

// @desc    Get all poems
// @route   GET /api/users/admin/poemsList
// @access  Private | Admin
export const getAllPoemsByAdmin = asyncHandler(async (req, res) => {
   const pageSize = process.env.PAGINATION_SIZE;
   const page = Number(req.query.pageNum) || 1;
   const filterOption = req.query.filterOption || "publishedAt";

   const count = await Poem.countDocuments({});
   const allPoems = await Poem.find({})
      .populate("author", "name")
      .sort({ [filterOption]: filterOption !== "title" ? -1 : 1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

   res.status(200).json({ allPoems, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Award poem of the day
// @route   POST /api/users/admin/poem/:poemId/poemOfTheDay
// @access  Private | Admin
export const awardPoemOfTheDay = asyncHandler(async (req, res) => {
   const { poemId } = req.body;
   const poem = await Poem.findById(poemId);

   if (poem.poemOfTheDay) {
      res.status(400);
      throw new Error("Poem is already awarded!");
   }

   // Check if another poem is being awarded on the same day
   const existingAward = await PoemOfTheDay.findOne({
      awardedAt: {
         $gte: new Date(new Date().setHours(0, 0, 0)),
         $lt: new Date(new Date().setHours(23, 59, 59)),
      },
   });

   if (existingAward) {
      res.status(400);
      throw new Error("Another poem is already awarded today!");
   }

   const poemData = {
      isAwarded: true,
      awardedAt: new Date(),
      poem: poem._id,
   };

   const poemOfTheDay = new PoemOfTheDay(poemData);
   const savedPoemOfTheDay = await poemOfTheDay.save();
   poem.poemOfTheDay = savedPoemOfTheDay._id;
   await poem.save();

   res.status(200).json(savedPoemOfTheDay);
});
