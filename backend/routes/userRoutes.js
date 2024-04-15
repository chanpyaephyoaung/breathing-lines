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
   fetchFollowerList,
   fetchFollowingsList,
   getAllNotificationsOfAUser,
   createNewNotification,
   getUnreadNotiCount,
   updateUnreadNotiCount,
   deleteUserAccount,
   getPoemRecommendations,
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
router.get("/:userId/poem-recommendations", protectRoutes, getPoemRecommendations);
router.post("/:userId/profile-review", protectRoutes, createAuthorProfileReview);
router.put("/user-profile/account/update", protectRoutes, updateUserAccProfile);
router.put("/:userId/view", protectRoutes, increaseViewCount);
router.put("/:userId/subscribe", protectRoutes, subscribeUser);
router.delete("/:userId/delete", protectRoutes, deleteUserAccount);
router.get("/user-profile/:userId/poems/:status", protectRoutes, getAllPoemsOfUser);
router.get("/user-profile/:userId/followers", protectRoutes, fetchFollowerList);
router.get("/user-profile/:userId/followings", protectRoutes, fetchFollowingsList);
router.post("/:userId/notifications/new", protectRoutes, createNewNotification);
router.get("/:userId/notifications/unread", protectRoutes, getUnreadNotiCount);
router.post("/:userId/notifications/unread", protectRoutes, updateUnreadNotiCount);
router.get("/:userId/notifications/", protectRoutes, getAllNotificationsOfAUser);

export default router;
