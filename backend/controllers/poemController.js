import asyncHandler from "../middleware/asyncHandler.js";
import Poem from "../models/poemModel.js";

// @desc    Fetch all poems
// @route   GET /api/poems
// @access  Public
const getPoems = asyncHandler(async (req, res) => {
   const poems = await Poem.find({});
   res.json(poems);
});

// @desc    Fetch a single poem by id
// @route   GET /api/poems/:id
// @access  Public
const getPoemById = asyncHandler(async (req, res) => {
   const poem = await Poem.findById(req.params.poemId);

   if (poem) {
      return res.json(poem);
   } else {
      res.status(404);
      throw new Error("Resource not found!");
   }
});

export { getPoems, getPoemById };
