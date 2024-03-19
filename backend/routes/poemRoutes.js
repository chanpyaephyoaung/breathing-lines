import express from "express";
import {
   getAllPoems,
   getSinglePoemById,
   writePoem,
   likePoem,
   ratePoem,
   createPoemReview,
} from "../controllers/poemController.js";
import { protectRoutes } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllPoems);

router.route("/:poemId").get(getSinglePoemById);
router.route("/:poemId/like").put(protectRoutes, likePoem);
router.route("/:poemId/rate").put(protectRoutes, ratePoem);
router.route("/:poemId/review").post(protectRoutes, createPoemReview);

router.route("/write").post(protectRoutes, writePoem);

export default router;
