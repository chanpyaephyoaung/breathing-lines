import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import dummyUsers from "./dummyData/users.js";
import dummyPoems from "./dummyData/poems.js";
import dummyCollections from "./dummyData/collections.js";
import dummyNotifications from "./dummyData/notifications.js";
import User from "./models/userModel.js";
import Poem from "./models/poemModel.js";
import AuthorProfileReview from "./models/authorProfileReviewModel.js";
import PoemRating from "./models/poemRatingModel.js";
import PoemReview from "./models/poemReviewModel.js";
import PoemOfTheDay from "./models/poemOfTheDayModel.js";
import Collection from "./models/collectionModel.js";
import UserNotification from "./models/userNotificationModel.js";
import dummyProfileReviews from "./dummyData/profileReviews.js";
import dummyPoemsOfTheDays from "./dummyData/poemsOfTheDays.js";

dotenv.config();

connectDB();

export const seedDummyData = async () => {
   try {
      // Remove all data before seeding
      await User.deleteMany();
      await Poem.deleteMany();
      await AuthorProfileReview.deleteMany();
      await PoemRating.deleteMany();
      await PoemReview.deleteMany();
      await Collection.deleteMany();
      await UserNotification.deleteMany();
      await PoemOfTheDay.deleteMany();

      // Seed sample data
      const createdDummyUsers = await User.insertMany(dummyUsers);
      const admin = createdDummyUsers[0]._id;
      const user = createdDummyUsers[1]._id;
      const user1Doc = createdDummyUsers[1];
      const user2Doc = createdDummyUsers[2];
      const user3Doc = createdDummyUsers[3];

      // Use first normal user as the author to sample poems
      const samplePoems = dummyPoems.map((poem) => ({
         ...poem,
         author: user,
      }));

      const poemsRes = await Poem.insertMany(samplePoems);
      // Insert poems ids to poems field of the user
      user1Doc.poems = poemsRes.map((poem) => poem._id);

      // Insert sample poems of the days
      const samplePoemsOfTheDys = dummyPoemsOfTheDays.map((poemOfTheDay, i) => ({
         ...poemOfTheDay,
         poem: poemsRes[poemsRes.length - 1 - i]._id,
      }));
      const poemsOfTheDaysRes = await PoemOfTheDay.insertMany(samplePoemsOfTheDys);
      const lastPoem = poemsRes[poemsRes.length - 1];
      const secondLastPoem = poemsRes[poemsRes.length - 2];
      const thirdLastPoem = poemsRes[poemsRes.length - 3];

      lastPoem.poemOfTheDay = poemsOfTheDaysRes[0]._id;
      secondLastPoem.poemOfTheDay = poemsOfTheDaysRes[1]._id;
      thirdLastPoem.poemOfTheDay = poemsOfTheDaysRes[2]._id;

      await lastPoem.save();
      await secondLastPoem.save();
      await thirdLastPoem.save();

      // Sample profile review
      const sampleProfileReview = dummyProfileReviews.map((review) => ({
         ...review,
         reviewedFor: user,
         reviewedBy: user2Doc._id,
      }));

      // Sample collection
      const sampleCollections = dummyCollections.map((collection) => ({
         ...collection,
         createdBy: user,
         poems: user1Doc.poems,
      }));

      // Sample notifications
      const sampleNotifications = dummyNotifications.map((notification, i) => {
         if (i === 0) {
            return {
               ...notification,
               createdBy: user1Doc._id,
               receivedBy: user3Doc._id,
               notificationMessage: `${user1Doc.name} has liked your poem!`,
            };
         } else if (i === 1) {
            return {
               ...notification,
               createdBy: user1Doc._id,
               receivedBy: user3Doc._id,
               notificationMessage: `${user1Doc.name} has followed you!`,
            };
         }
      });

      // Insert sample collection to user1
      const collectionRes = await Collection.insertMany(sampleCollections);
      user1Doc.collections = collectionRes.map((collection) => collection._id);

      // Insert profile reviews to profileReviews field of the user
      const profileReviewsRes = await AuthorProfileReview.insertMany(sampleProfileReview);
      user1Doc.profileReviews = profileReviewsRes.map((review) => review._id);

      // Insert sample notications to user1
      const notificationsRes = await UserNotification.insertMany(sampleNotifications);
      user3Doc.notifications = notificationsRes.map((notification) => notification._id);

      // Save the document
      await user1Doc.save();

      console.log("Dummy Data Has Been Successfully SEEDED!");

      if (process.env.NODE_ENV !== "test") {
         process.exit();
      }
   } catch (err) {
      console.error(err.message);
      process.exit(1);
   }
};

const removeDummyData = async () => {
   try {
      // Remove all data
      await User.deleteMany();
      await Poem.deleteMany();
      await AuthorProfileReview.deleteMany();
      await PoemRating.deleteMany();
      await PoemReview.deleteMany();
      await UserNotification.deleteMany();
      await Collection.deleteMany();
      await PoemOfTheDay.deleteMany();

      console.log("Dummy Data Has Been Successfully REMOVED!");
      process.exit();
   } catch (err) {
      console.error(err.message);
      process.exit(1);
   }
};

if (process.argv[2] === "-s") {
   seedDummyData();
} else if (process.argv[2] === "-r") {
   removeDummyData();
}
