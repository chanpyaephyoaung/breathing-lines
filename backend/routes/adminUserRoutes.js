import express from "express";
import {
   getAllUsersByAdmin,
   banUserByAdmin,
   getAllPoemsByAdmin,
} from "../controllers/adminUserController.js";
import { protectRoutes, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/usersList", protectRoutes, verifyAdmin, getAllUsersByAdmin);
router.get("/poemsList", protectRoutes, verifyAdmin, getAllPoemsByAdmin);
router.put("/:userId/ban", protectRoutes, verifyAdmin, banUserByAdmin);

export default router;
