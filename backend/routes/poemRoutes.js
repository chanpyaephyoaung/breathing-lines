import express from "express";
import dummyPoems from "../dummyData/poems.js";
import { getAllPoems, getSinglePoemById } from "../controllers/poemController.js";

const router = express.Router();

router.route("/").get(getAllPoems);

router.route("/:poemId").get(getSinglePoemById);

export default router;
