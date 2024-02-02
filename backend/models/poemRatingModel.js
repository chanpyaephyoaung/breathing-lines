import mongoose from "mongoose";

const poemRatingSchema = new mongoose.Schema({
   rating: {
      type: Number,
      required: true,
   },
   ratedAt: {
      type: Date,
      default: new Date(),
   },
   ratedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   ratedPoem: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Poem",
   },
});

const PoemRating = mongoose.model("PoemRating", poemRatingSchema);

export default PoemRating;
