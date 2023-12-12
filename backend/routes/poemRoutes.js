import express from "express";
import { getPoems, getPoemById } from "../controllers/poemController.js";

const router = express.Router();

router.route("/").get(getPoems);
router.route("/:poemId").get(getPoemById);

export default router;
