import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      name: {
         type: String,
         required: true,
      },
      comment: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

export const poemSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      title: {
         type: String,
         required: true,
      },
      viewsCount: {
         type: Number,
         required: true,
         default: 0,
      },
      date: {
         type: Date,
         required: true,
         default: Date.now,
      },
      content: {
         type: String,
         required: true,
      },
      coverImg: {
         type: String,
         required: true,
      },
      tags: {
         type: [],
         required: true,
      },
      comments: [commentSchema],
      reviewsCount: {
         type: Number,
         required: true,
         default: 0,
      },
      likesCount: {
         type: Number,
         required: true,
         default: 0,
      },
      sharesCount: {
         type: Number,
         required: true,
         default: 0,
      },
   },
   { timestamps: true }
);

const Poem = mongoose.model("Poem", poemSchema);

export default Poem;
