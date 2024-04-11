import mongoose from "mongoose";

const poemReviewSchema = new mongoose.Schema({
   review: {
      type: String,
      required: true,
   },
   reviewedAt: {
      type: Date,
      default: new Date(),
   },
   reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   reviewedFor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   reviewedPoem: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Poem",
   },
});

const PoemReview = mongoose.model("PoemReview", poemReviewSchema);

export default PoemReview;
