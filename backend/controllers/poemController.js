import asyncHandler from "../middleware/asyncHandler.js";
import Poem from "../models/poemModel.js";
import User from "../models/userModel.js";

// @desc    Fetch all poems
// @route   GET /api/poems
// @access  Public
const getPoems = asyncHandler(async (req, res) => {
   const poems = await Poem.find({});

   // const addAuthorToPoems = async (data) => {
   //    const promises = data.map(async (poem) => {
   //       const user = await User.findById(poem.user);
   //       console.log("User!!!", user);
   //       return { ...poem, author: user.name };
   //    });

   //    return Promise.all(promises);
   // };

   // const resPoems = await addAuthorToPoems(poems);

   // if (resPoems) {
   //    console.log("altered POems ", resPoems);

   //    res.json(resPoems);
   // }

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

// @desc    Fetch a single poem by id
// @route   GET /api/poems/:id
// @access  Public
const uploadPoem = asyncHandler(async (req, res) => {
   const { title, user, content, coverImg, tags } = req.body;

   const poem = await Poem.create({
      title,
      user,
      content,
      coverImg,
      tags,
   });

   if (poem) {
      res.status(201).json({
         title: poem.name,
         user: poem.user,
         content: poem.content,
         coverImg: poem.coverImg,
         tags: poem.tags,
      });
   }
});

export { getPoems, getPoemById, uploadPoem };
