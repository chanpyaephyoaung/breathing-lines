import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import dummyUsers from "./dummyData/users.js";
import dummyPoems from "./dummyData/poems.js";
import User from "./models/userModel.js";
import Poem from "./models/poemModel.js";
import AuthorProfileReview from "./models/authorProfileReviewModel.js";
import PoemRating from "./models/poemRatingModel.js";
import UserNotification from "./models/userNotificationModel.js";
import dummyProfileReviews from "./dummyData/profileReviews.js";

dotenv.config();

connectDB();

export const seedDummyData = async () => {
   try {
      // Remove all data before seeding
      await User.deleteMany();
      await Poem.deleteMany();
      await AuthorProfileReview.deleteMany();
      await PoemRating.deleteMany();
      await UserNotification.deleteMany();

      // Seed sample data
      const createdDummyUsers = await User.insertMany(dummyUsers);
      const admin = createdDummyUsers[0]._id;
      const user = createdDummyUsers[1]._id;
      const user1 = createdDummyUsers[2]._id;

      // Use first normal user as the author to sample poems
      const samplePoems = dummyPoems.map((poem) => ({
         ...poem,
         author: user,
      }));

      await Poem.insertMany(samplePoems);

      // Sample profile review
      const sampleProfileReview = dummyProfileReviews.map((review) => ({
         ...review,
         reviewedFor: user,
         reviewedBy: user1,
      }));

      await AuthorProfileReview.insertMany(sampleProfileReview);

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
      await UserNotification.deleteMany();

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
