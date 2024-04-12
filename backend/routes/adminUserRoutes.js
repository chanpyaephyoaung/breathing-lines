import express from "express";
import {
   getAllUsersByAdmin,
   banUserByAdmin,
   getAllPoemsByAdmin,
   awardPoemOfTheDay,
} from "../controllers/adminUserController.js";
import { protectRoutes, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/usersList", protectRoutes, verifyAdmin, getAllUsersByAdmin);
router.get("/poemsList", protectRoutes, verifyAdmin, getAllPoemsByAdmin);
router.put("/:userId/ban", protectRoutes, verifyAdmin, banUserByAdmin);
router.post("/poem/:poemId/poemOfTheDay", protectRoutes, verifyAdmin, awardPoemOfTheDay);

export default router;
