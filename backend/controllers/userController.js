import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Poem from "../models/poemModel.js";
import UserNotification from "../models/userNotificationModel.js";
import AuthorProfileReview from "../models/authorProfileReviewModel.js";
import PoemReview from "../models/poemReviewModel.js";
import PoemRating from "../models/poemRatingModel.js";
import Collection from "../models/collectionModel.js";
import generateJwtToken from "../helpers/generateJwtToken.js";
import { s3RetrieveV3 } from "../s3Service.js";

// @desc    Authenticate user & get token
// @route   POST /api/users/signin
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (user && (await user.comparePassword(password))) {
      generateJwtToken(res, user._id);

      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         isBanned: user.isBanned,
      });
   } else {
      res.status(401);
      throw new Error("Invalid email or password!");
   }
});

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   const isUserExists = await User.findOne({ email });

   if (isUserExists) {
      res.status(400);
      throw new Error("User is already registered!");
   }

   const newUser = await User.create({
      name,
      email,
      password,
   });

   if (newUser) {
      generateJwtToken(res, newUser._id);

      res.status(201).json({
         _id: newUser._id,
         name: newUser.name,
         email: newUser.email,
         isAdmin: newUser.isAdmin,
      });
   } else {
      res.status(400);
      throw new Error("Invalid user form data!");
   }
});

// @desc    Delete a useraccount
// @route   DELETE /api/users/:userId/delete
// @access  Private
export const deleteUserAccount = asyncHandler(async (req, res) => {
   const targetUserId = req.body.userId;
   const currentUser = await User.findById(targetUserId);

   if (currentUser) {
      // Delete all poems created by the user
      await Poem.deleteMany({ author: currentUser._id });

      // Delete all notifications related to the user
      await UserNotification.deleteMany({
         $or: [{ createdBy: currentUser._id }, { receivedBy: currentUser._id }],
      });

      // Delete all reviews related to the user
      await AuthorProfileReview.deleteMany({
         $or: [{ reviewedBy: currentUser._id }, { reviewedFor: currentUser._id }],
      });

      // Delete all poems comments related to the user
      await PoemReview.deleteMany({
         $or: [{ reviewedBy: currentUser._id }, { reviewedFor: currentUser._id }],
      });

      // Delete all poem ratings related to the user
      await PoemRating.deleteMany({ ratedBy: currentUser._id });

      // Delete all the collections created by the user
      await Collection.deleteMany({ createdBy: currentUser._id });

      // Delete the user account
      await User.deleteOne({ _id: currentUser._id });

      res.status(200).json({ message: "User Account deleted successfully." });
   } else {
      res.status(404);
      throw new Error("User account deletion unsuccessful. User not found.");
   }
});

// @desc    Sign out user & remove cookie
// @route   POST /api/users/signout
// @access  Private
export const signOutUser = asyncHandler(async (req, res) => {
   res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
   });

   res.status(200).json({ message: "Signed out successfully!" });
});

// @desc    Get user account profile details
// @route   GET /api/users/user-profile/:userId
// @access  Private
export const getUserAccProfile = asyncHandler(async (req, res) => {
   const targetUser = await User.findById(req.params.userId);

   let image = "";

   if (targetUser?.profileImg) {
      const result = await s3RetrieveV3(targetUser.profileImg);
      image = await result.Body?.transformToString("base64");
   }

   if (targetUser && targetUser.profileReviews.length > 0) {
      const targetUserWithProfileReviews = await targetUser.populate({
         path: "profileReviews",
         select: "review reviewedAt reviewedBy",
         populate: {
            path: "reviewedBy",
            select: "name",
         },
      });

      res.status(200).json({
         targetUser: targetUserWithProfileReviews,
         encodedProfileImage: image,
      });
   } else if (targetUser && targetUser.profileReviews.length === 0) {
      res.status(200).json({ targetUser, encodedProfileImage: image });
   } else {
      res.status(404);
      throw new Error("Current user not found!");
   }
});

// @desc    Update user profile details
// @route   PUT /api/users/user-profile/:userId
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
   const currentUser = await User.findById(req.currentUser._id);

   if (currentUser) {
      currentUser.name = req.body.newProfileData.name || currentUser.name;
      currentUser.profileImg = req.body.newProfileData.profileImg || currentUser.profileImg;
      currentUser.profileDesc = req.body.newProfileData.profileDesc || currentUser.profileDesc;

      const updatedCurrentUser = await currentUser.save();

      res.status(200).json(updatedCurrentUser);
   } else {
      res.status(404);
      throw new Error("Profile update unsuccessful. User not found.");
   }
});

// @desc    Update user account profile details
// @route   PUT /api//user-profile/account/update
// @access  Private
export const updateUserAccProfile = asyncHandler(async (req, res) => {
   const currentUser = await User.findById(req.currentUser._id);

   if (currentUser) {
      currentUser.email = req.body.email || currentUser.email;

      if (req.body.password) {
         currentUser.password = req.body.password;
      }

      const updatedCurrentUser = await currentUser.save();

      res.status(200).json({
         _id: updatedCurrentUser._id,
         isAdmin: updatedCurrentUser.isAdmin,
         name: currentUser.name,
         email: updatedCurrentUser.email,
      });
   } else {
      res.status(404);
      throw new Error("Account update unsuccessful. User not found.");
   }
});

// @desc    Leave a profile review on other author's profile
// @route   POST /api/users/:userId/profile-review
// @access  Private
export const createAuthorProfileReview = asyncHandler(async (req, res) => {
   const userId = req.params.userId;
   const { review } = req.body;

   const targetUser = await User.findById(userId);
   const currentUser = req.currentUser._id;

   const alreadyReviewed = await AuthorProfileReview.findOne({ reviewedBy: currentUser });

   if (!alreadyReviewed) {
      // Create and save new review
      const newReview = new AuthorProfileReview({
         review,
         reviewedAt: new Date(),
         reviewedBy: currentUser,
         reviewedFor: userId,
      });
      const savedReview = await newReview.save();

      // Add and save the review to the author's profileReviews array
      targetUser.profileReviews.push(savedReview._id);
      await targetUser.save();

      res.status(201).json({ message: "Profile Review added successfully!" });
   } else {
      res.status(400);
      throw new Error("You have already made a review on this poem!");
   }
});

// @desc    Increase a user views count
// @route   PUT /api/users/:userId/view
// @access  Private
export const increaseViewCount = asyncHandler(async (req, res) => {
   const { userId } = req.body;
   const targetUser = await User.findById(userId);
   const currentUser = req.currentUser._id;
   if (targetUser) {
      // Increase the view count only if the user is anonymous(not signed-in) or not the current user itself
      if (!currentUser || currentUser !== userId) {
         targetUser.profileViewsCount += 1;
         await targetUser.save();
         res.status(200).json({ message: "View count increased!" });
      } else {
         res.status(200).json({ message: "View count not increased!" });
      }
   } else {
      res.status(404);
      throw new Error("User not found!");
   }
});

// @desc    Subscribe to a user (Follow/Unfollow)
// @route   PUT /api/users//:userId/subscribe
// @access  Private
export const subscribeUser = asyncHandler(async (req, res) => {
   const targetUserId = req.params.userId;
   const currentUserId = req.currentUser._id;

   if (targetUserId === currentUserId) {
      res.status(400);
      throw new Error("You cannot subscribe to yourself!");
   }

   const targetUser = await User.findById(targetUserId);
   const currentUser = await User.findById(currentUserId);

   if (targetUser) {
      if (targetUser.followers.includes(currentUserId)) {
         // Remove the current user from the target user's followers array
         const newTargetUserFollowers = targetUser.followers.filter(
            (user) => user.toString() !== currentUserId.toString()
         );
         targetUser.followers = newTargetUserFollowers;

         // Remove the target user from the current user's following array
         const newCurrentUserFollowing = currentUser.followings.filter(
            (user) => user.toString() !== targetUserId.toString()
         );
         currentUser.followings = newCurrentUserFollowing;

         await targetUser.save();
         await currentUser.save();
         res.status(200).json({
            message: `You have now unfollowed ${targetUser.name}.`,
         });
      } else {
         // Add the current user to the target user's followers array
         targetUser.followers.push(currentUserId);
         // Add the target user to the current user's followings array
         currentUser.followings.push(targetUserId);

         await targetUser.save();
         await currentUser.save();
         res.status(200).json({ message: `You have now followed ${targetUser.name}.` });
      }
   } else {
      res.status(404);
      throw new Error("User not found!");
   }
});

// @desc    Fetch all poems of a specific user
// @route   GET /api/user-profile/:userId/poems/:status
// @access  Private
export const getAllPoemsOfUser = asyncHandler(async (req, res) => {
   const { userId } = req.params;
   const status = req.params.status || "published";
   let poems = [];
   if (status === "drafted") {
      poems = await Poem.find({ author: userId, status: "drafted" }).populate("author", "name");
   } else if (status === "published") {
      poems = await Poem.find({ author: userId, status: "published" }).populate("author", "name");
   } else if (status === "favorites") {
      const userObj = await User.findById(userId).populate({
         path: "favoritedPoems",
         select: "title content author genres coverImg publishedAt status viewsCount",
         populate: {
            path: "author",
            select: "name profileImg",
         },
      });
      poems = userObj.favoritedPoems;
   }
   const poemsWithEncodedCoverImg = await Promise.all(
      poems.map(async (poem, i) => {
         let image = "";
         if (poem?.coverImg && i === 3) {
            // Just for testing purpose. Remove the second condition in production
            const result = await s3RetrieveV3(poem.coverImg);
            image = await result.Body?.transformToString("base64");
         }
         return { ...poem._doc, encodedCoverImg: image };
      })
   );
   res.json(poemsWithEncodedCoverImg);
});

// @desc    Get user's followers list
// @route   GET /api/users/user-profile/:userId/followers
// @access  Private
export const fetchFollowerList = asyncHandler(async (req, res) => {
   const targetUser = await User.findById(req.params.userId).populate(
      "followers",
      "name profileImg"
   );

   if (targetUser) {
      const targetUserFollowersWithEncodedProfileImgs = await Promise.all(
         targetUser.followers.map(async (follower, i) => {
            let image = "";
            if (follower?.profileImg && i === 6) {
               // Just for testing purpose. Remove the second condition in production
               const result = await s3RetrieveV3(follower.profileImg);
               image = await result.Body?.transformToString("base64");
            }
            return { ...follower._doc, encodedProfileImg: image };
         })
      );

      res.status(200).json(targetUserFollowersWithEncodedProfileImgs);
   } else {
      res.status(404);
      throw new Error("Current user not found!");
   }
});

// @desc    Get user's followers list
// @route   GET /api/users/user-profile/:userId/followers
// @access  Private
export const fetchFollowingsList = asyncHandler(async (req, res) => {
   const targetUser = await User.findById(req.params.userId).populate(
      "followings",
      "name profileImg"
   );

   if (targetUser) {
      const targetUserFollowingsWithEncodedProfileImgs = await Promise.all(
         targetUser.followings.map(async (following, i) => {
            let image = "";
            if (following?.profileImg && i === 6) {
               // Just for testing purpose. Remove the second condition in production
               const result = await s3RetrieveV3(following.profileImg);
               image = await result.Body?.transformToString("base64");
            }
            return { ...following._doc, encodedProfileImg: image };
         })
      );

      res.status(200).json(targetUserFollowingsWithEncodedProfileImgs);
   } else {
      res.status(404);
      throw new Error("Current user not found!");
   }
});

// @desc    Retrieve all notifications of a user
// @route   GET /api/users/:userId/notifications
// @access  Private
export const getAllNotificationsOfAUser = asyncHandler(async (req, res) => {
   const currentUserId = req.currentUser._id;
   const currentUser = await User.findById(currentUserId).populate({
      path: "notifications",
      select: "createdBy notificationMessage payload notificationType createdAt",
      populate: {
         path: "createdBy",
         select: "name profileImg",
      },
   });

   if (currentUser) {
      const currentUserNotiWithEncodedProfileImgs = await Promise.all(
         currentUser.notifications.map(async (user, i) => {
            let image = "";
            if (user?.profileImg && i === 2) {
               // Just for testing purpose. Remove the second condition in production
               const result = await s3RetrieveV3(user.profileImg);
               image = await result.Body?.transformToString("base64");
            }
            return { ...user._doc, encodedProfileImg: image };
         })
      );

      // Sort the notifications by placing latest first in the first index
      const sortedNotiByDate = currentUserNotiWithEncodedProfileImgs.sort(
         (a, b) => b.createdAt - a.createdAt
      );
      res.status(200).json(sortedNotiByDate);
   } else {
      res.status(404);
      throw new Error("Current user not found!");
   }
});

// @desc    Create a new notification for a user
// @route   POST /api/users/:userId/notifications/new
// @access  Private
export const createNewNotification = asyncHandler(async (req, res) => {
   const {
      createdBy,
      receivedBy,
      notificationMessage,
      payload = null,
      notificationType,
      createdAt,
   } = req.body.newNotiData;
   const targetUser = await User.findById(receivedBy);

   const newNoti = new UserNotification({
      createdBy,
      receivedBy,
      notificationMessage,
      payload,
      notificationType,
      createdAt,
   });

   const savedNoti = await newNoti.save();

   // Add notification to the user's notifications array
   targetUser.notifications.push(savedNoti._id);
   await targetUser.save();

   res.status(201).json(savedNoti);
});

// @desc    Increase unread notification count of a user
// @route   POST /api/users/:userId/notifications/unread
// @access  Private
export const updateUnreadNotiCount = asyncHandler(async (req, res) => {
   const { defaultCount, userId } = req.body;
   const targetUser = await User.findById(userId);

   if (defaultCount === 0) {
      targetUser.unreadNotificationsCount = defaultCount;
   } else {
      targetUser.unreadNotificationsCount += 1;
   }

   await targetUser.save();

   res.status(201).json(targetUser.unreadNotificationsCount);
});

// @desc    Retrieve unread notifications count of a user
// @route   GET /api/users/:userId/notifications/unread
// @access  Private
export const getUnreadNotiCount = asyncHandler(async (req, res) => {
   const userId = req.currentUser._id;
   const targetUser = await User.findById(userId);

   res.status(200).json(targetUser.unreadNotificationsCount);
});

// @desc    Retrieve poem recommendations of a user
// @route   GET /api/users/:userId/poem-recommendations
// @access  Private
export const getPoemRecommendations = asyncHandler(async (req, res) => {
   console.log("Poem recommendations route hit");
   const currentUserId = req.currentUser._id;
   const currentUser = await User.findById(currentUserId);

   console.log(currentUser.poemRecommendations.length);

   const recommendedPoemsWithEncodedCoverImg = await Promise.all(
      currentUser.poemRecommendations.map(async (poem) => {
         const currentPoem = await Poem.findById(poem.id).populate("author", "name");

         let image = "";
         // if (currentPoem?.coverImg) {
         //    // Just for testing purpose. Remove the second condition in production
         //    const result = await s3RetrieveV3(currentPoem.coverImg);
         //    image = await result.Body?.transformToString("base64");
         // }
         return { ...currentPoem._doc, encodedCoverImg: image };
      })
   );

   res.status(200).json(recommendedPoemsWithEncodedCoverImg);
});
