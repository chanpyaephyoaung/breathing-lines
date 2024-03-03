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

// @desc    Write
// @route   POST /api/poems/write
// @access  Private
export const writePoem = asyncHandler(async (req, res) => {
   const { title, content, coverImg, status, genres } = req.body;

   const newPoem = new Poem({
      title,
      content,
      author: req.currentUser._id,
      coverImg,
      status,
      genres,
   });

   const savedPoem = await newPoem.save();

   // Add the poem to the user's poems field
   const currentUser = await User.findById(req.currentUser._id);
   currentUser.poems.push(savedPoem._id);

   await currentUser.save();

   res.status(201).json(savedPoem);
});
