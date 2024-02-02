import mongoose from "mongoose";

const authorProfileReviewSchema = new mongoose.Schema({
   review: {
      type: String,
      required: true,
   },
   reviewedAt: {
      type: Date,
      default: new Date(),
   },
   reviewedFor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
});

const AuthorProfileReview = mongoose.model("AuthorProfileReview", authorProfileReviewSchema);

export default AuthorProfileReview;
