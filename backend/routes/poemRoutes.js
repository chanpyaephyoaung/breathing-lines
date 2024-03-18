import express from "express";
import {
   getAllPoems,
   getSinglePoemById,
   writePoem,
   likePoem,
} from "../controllers/poemController.js";
import { protectRoutes } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllPoems);

router.route("/:poemId").get(getSinglePoemById);
router.route("/:poemId/:like").put(protectRoutes, likePoem);

router.route("/write").post(protectRoutes, writePoem);

export default router;
