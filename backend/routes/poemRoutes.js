import express from "express";
import { getPoems, getPoemById, uploadPoem } from "../controllers/poemController.js";

const router = express.Router();

router.route("/").get(getPoems);
router.route("/:poemId").get(getPoemById);
router.route("/write").post(uploadPoem);

export default router;
