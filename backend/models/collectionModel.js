import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   poems: [
      {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Poem",
      },
   ],
});

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
