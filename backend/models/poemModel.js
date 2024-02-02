import mongoose from "mongoose";

const poemSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   genres: {
      type: [],
      required: true,
   },
   publishedAt: {
      type: Date,
      default: new Date(),
   },
   viewsCount: {
      type: Number,
      required: true,
      default: 0,
   },
   likesCount: {
      type: Number,
      required: true,
      default: 0,
   },
   status: {
      type: String,
      required: true,
   },
   ratings: [
      {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "PoemRating",
      },
   ],
   reviews: [
      {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "PoemReview",
      },
   ],
   shares: [
      {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
   ],
   collections: [
      {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Collection",
      },
   ],
});

const Poem = mongoose.model("Poem", poemSchema);

export default Poem;
