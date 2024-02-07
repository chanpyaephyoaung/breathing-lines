import express from "express";
import {
   getAllUsersByAdmin,
   getSingleUserById,
   deleteUserByAdmin,
   updateUserByAdmin,
} from "../controllers/adminUserController.js";

const router = express.Router();

router.get("/", getAllUsersByAdmin);
router.route("/:userId").get(getSingleUserById).delete(deleteUserByAdmin).put(updateUserByAdmin);

export default router;
