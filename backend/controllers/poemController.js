import asyncHandler from "../middleware/asyncHandler.js";
import Poem from "../models/poemModel.js";
import User from "../models/userModel.js";

// @desc    Fetch all poems
// @route   GET /api/poems
// @access  Public
export const getAllPoems = asyncHandler(async (req, res) => {
   const poems = await Poem.find({}).populate("author", "name");
   res.json(poems);
});

// @desc    Fetch a single poem by ID
// @route   GET /api/poems/:poemId
// @access  Public
export const getSinglePoemById = asyncHandler(async (req, res) => {
   const targetPoem = await Poem.findById(req.params.poemId).populate("author", "name");

   if (targetPoem) {
      return res.json(targetPoem);
   } else {
      res.status(404);
      throw new Error("Poem not found!");
   }
});
