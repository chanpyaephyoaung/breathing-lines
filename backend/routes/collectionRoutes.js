import express from "express";
import {
   createNewCollection,
   getCollectionsOfUser,
   getOneCollectionOfUser,
} from "../controllers/collectionController.js";
import { protectRoutes } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protectRoutes, getCollectionsOfUser).post(protectRoutes, createNewCollection);
router.get("/:collectionId", protectRoutes, getOneCollectionOfUser);

export default router;
