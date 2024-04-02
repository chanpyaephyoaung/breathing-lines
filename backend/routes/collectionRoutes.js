import express from "express";
import {
   createNewCollection,
   getCollectionsOfUser,
   getOneCollectionOfUser,
   addPoemToCollection,
} from "../controllers/collectionController.js";
import { protectRoutes } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protectRoutes, getCollectionsOfUser).post(protectRoutes, createNewCollection);
router.get("/:collectionId", protectRoutes, getOneCollectionOfUser);
router.post("/:collectionId/add/poem/:poemId", protectRoutes, addPoemToCollection);

export default router;
