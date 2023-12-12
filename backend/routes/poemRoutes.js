import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Poem from "../models/poemModel.js";

const router = express.Router();

router.get(
   "/",
   asyncHandler(async (req, res) => {
      const poems = await Poem.find({});
      res.json(poems);
   })
);

router.get(
   "/:poemId",
   asyncHandler(async (req, res) => {
      const poem = await Poem.findById(req.params.poemId);

      if (poem) {
         return res.json(poem);
      } else {
         res.status(404);
         throw new Error("Resource not found!");
      }
   })
);

export default router;
