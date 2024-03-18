import asyncHandler from "../middleware/asyncHandler.js";
import Poem from "../models/poemModel.js";
import User from "../models/userModel.js";
import { s3RetrieveV3 } from "../s3Service.js";

// @desc    Fetch all poems
// @route   GET /api/poems
// @access  Public
export const getAllPoems = asyncHandler(async (req, res) => {
   const poems = await Poem.find({}).populate("author", "name");

   res.json({ poems });

   // const poemsWithEncodedCoverImg = await Promise.all(
   //    poems.map(async (poem, i) => {
   //       let image = "";
   //       if (poem?.coverImg && i === 3) {
   //          // Just for testing purpose. Remove the second condition in production
   //          const result = await s3RetrieveV3(poem.coverImg);
   //          image = await result.Body?.transformToString("base64");
   //       }
   //       return { poem, encodedCoverImg: image };
   //    })
   // );

   // res.json(poemsWithEncodedCoverImg);
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

// @desc    Write
// @route   PUT /api/poems/:id/love
// @access  Private
export const likePoem = asyncHandler(async (req, res) => {
   const poemId = req.params.poemId;

   // Retreive the poem
   const poem = await Poem.findById(poemId);

   if (poem) {
      const alreadyLiked = poem.likes.find(
         (user) => user.toString() === req.currentUser._id.toString()
      );

      if (!alreadyLiked) {
         // Increase the likes count
         poem.likesCount += 1;
         // Add the user to the likes array
         poem.likes.push(req.currentUser._id);
      } else {
         // Decrease the likes count
         poem.likesCount -= 1;
         // Remove the user from the likes array
         poem.likes = poem.likes.filter(
            (user) => user.toString() !== req.currentUser._id.toString()
         );
      }

      // Save updated poem
      const updatedPoem = await poem.save();
      res.status(200).json(updatedPoem);
   } else {
      res.status(404);
      throw new Error("Poem not found!");
   }
});
