import express from "express";
import {
   authUser,
   registerUser,
   logoutUser,
   getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.post("/write", protect, (req, res) => res.json({ message: "Written" }));

export default router;
