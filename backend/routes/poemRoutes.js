import express from "express";
import dummyPoems from "../dummyData/poems.js";
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
      const targetPoem = await Poem.findById(req.params.poemId);
      console.log(targetPoem);

      if (targetPoem) {
         return res.json(targetPoem);
      } else {
         res.status(404);
         throw new Error("Poem not found!");
      }
   })
);

export default router;
