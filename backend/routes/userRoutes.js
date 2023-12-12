import express from "express";
import {
   authUser,
   registerUser,
   logoutUser,
   getUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(getUserProfile);

export default router;
