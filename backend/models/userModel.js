import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
   favoritedPoems: [
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
         ref: "AuthorProfileReview",
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
   poemRecommendations: [
      {
         type: Object,
      },
   ],
   unreadNotificationsCount: {
      type: Number,
      required: true,
      default: 0,
   },
});

userSchema.methods.comparePassword = async function (inputPassword) {
   return await bcrypt.compare(inputPassword, this.password);
};

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
