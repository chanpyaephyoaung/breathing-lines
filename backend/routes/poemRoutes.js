import express from "express";
import { getAllPoems, getSinglePoemById, writePoem } from "../controllers/poemController.js";
import { protectRoutes } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllPoems);

router.route("/:poemId").get(getSinglePoemById);

router.route("/write").post(protectRoutes, writePoem);

export default router;
