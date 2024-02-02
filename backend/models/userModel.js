import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   isAdmin: {
      type: Boolean,
      required: true,
      default: false,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   profileImg: {
      type: String,
   },
   profileDesc: {
      type: String,
   },
   profileViewsCount: {
      type: Number,
      default: 0,
   },
   isBanned: {
      type: Boolean,
      required: true,
      default: false,
   },
   poems: [
      {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Poem",
      },
   ],
   collections: [
      {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Collection",
      },
   ],
   profileReviews: [
      {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "ProfileReview",
      },
   ],
   followers: [
      {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
   ],
   followings: [
      {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
   ],
   notifications: [
      {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "UserNotification",
      },
   ],
});

const User = mongoose.model("User", userSchema);

export default User;
