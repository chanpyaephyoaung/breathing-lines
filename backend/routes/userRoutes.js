import express from "express";
import {
   authUser,
   registerUser,
   signOutUser,
   getUserAccProfile,
   updateUserAccProfile,
   updateUserProfile,
} from "../controllers/userController.js";
import { protectRoutes } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signin", authUser);
router.post("/register", registerUser);
router.post("/signout", signOutUser);
router
   .route("/user-profile/:userId")
   .get(protectRoutes, getUserAccProfile)
   .put(protectRoutes, updateUserProfile);
router.put("/user-profile", protectRoutes, updateUserAccProfile);

export default router;
