import asyncHandler from "../middleware/asyncHandler.js";
import Poem from "../models/poemModel.js";

// @desc    Fetch all poems
// @route   GET /api/poems
// @access  Public
const getAllPoems = asyncHandler(async (req, res) => {
   const poems = await Poem.find({});
   res.json(poems);
});

// @desc    Fetch a single poem by ID
// @route   GET /api/poems/:poemId
// @access  Public
const getSinglePoemById = asyncHandler(async (req, res) => {
   const targetPoem = await Poem.findById(req.params.poemId);
   console.log(targetPoem);

   if (targetPoem) {
      return res.json(targetPoem);
   } else {
      res.status(404);
      throw new Error("Poem not found!");
   }
});

export { getAllPoems, getSinglePoemById };