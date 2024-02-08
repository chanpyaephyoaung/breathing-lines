import express from "express";
import {
   getAllUsersByAdmin,
   getSingleUserById,
   deleteUserByAdmin,
   updateUserByAdmin,
} from "../controllers/adminUserController.js";
import { protectRoutes, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoutes, verifyAdmin, getAllUsersByAdmin);
router
   .route("/:userId")
   .get(protectRoutes, verifyAdmin, getSingleUserById)
   .delete(protectRoutes, verifyAdmin, deleteUserByAdmin)
   .put(protectRoutes, verifyAdmin, updateUserByAdmin);

export default router;
