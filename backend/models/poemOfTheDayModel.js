import mongoose from "mongoose";

const poemOfTheDaySchema = new mongoose.Schema({
   isAwarded: {
      type: Boolean,
      required: true,
   },
   awardedAt: {
      type: Date,
      required: true,
      default: new Date(),
   },
   poem: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Poem",
   },
});

const PoemOfTheDay = mongoose.model("PoemOfTheDay", poemOfTheDaySchema);

export default PoemOfTheDay;
