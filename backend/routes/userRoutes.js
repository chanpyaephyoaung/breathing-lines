import express from "express";
import {
   authUser,
   registerUser,
   signOutUser,
   getUserAccProfile,
   updateUserAccProfile,
   updateUserProfile,
   createAuthorProfileReview,
   increaseViewCount,
   subscribeUser,
   getAllPoemsOfUser,
   createNewCollection,
   getCollectionsOfUser,
   getOneCollectionOfUser,
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
router.post("/:userId/profile-review", protectRoutes, createAuthorProfileReview);
router.put("/user-profile/account/update", protectRoutes, updateUserAccProfile);
router.put("/:userId/view", protectRoutes, increaseViewCount);
router.put("/:userId/subscribe", protectRoutes, subscribeUser);
router.get("/user-profile/:userId/poems/:status", protectRoutes, getAllPoemsOfUser);
router
   .route("/user-profile/:userId/collections")
   .get(protectRoutes, getCollectionsOfUser)
   .post(protectRoutes, createNewCollection);
router.get(
   "/user-profile/:userId/collections/:collectionId",
   protectRoutes,
   getOneCollectionOfUser
);

export default router;
