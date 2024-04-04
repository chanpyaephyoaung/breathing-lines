import express from "express";
import {
   createNewCollection,
   getCollectionsOfUser,
   getOneCollectionOfUser,
   addPoemToCollection,
   removePoemFromCollection,
   deleteCollection,
} from "../controllers/collectionController.js";
import { protectRoutes } from "../middleware/authMiddleware.js";

const router = express.Router();

router
   .route("/:userId/collections")
   .get(protectRoutes, getCollectionsOfUser)
   .post(protectRoutes, createNewCollection);
router
   .route("/:userId/collections/:collectionId")
   .get(protectRoutes, getOneCollectionOfUser)
   .delete(protectRoutes, deleteCollection);
router.post(
   "/:userId/collections/:collectionId/add/poem/:poemId",
   protectRoutes,
   addPoemToCollection
);
router.delete(
   "/:userId/collections/:collectionId/delete/poem/:poemId",
   protectRoutes,
   removePoemFromCollection
);

export default router;
