import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import { poems } from "./data/poems.js";
import User from "./models/userModel.js";
import Poem from "./models/poemModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
   try {
      await Poem.deleteMany();
      await User.deleteMany();

      const createdUsers = await User.insertMany(users);
      const sampleUser = createdUsers[0]._id;

      const samplePoems = poems.map((poem) => {
         return { ...poem, user: sampleUser };
      });

      await Poem.insertMany(samplePoems);

      console.log("DATA IMPORTED!");
      process.exit();
   } catch (err) {
      console.error(`${err}`);
      process.exit(1);
   }
};

const destroyData = async () => {
   try {
      await Poem.deleteMany();
      await User.deleteMany();

      console.log("DATA DESTROYED!");
      process.exit();
   } catch (err) {
      console.error(`${err}`);
      process.exit(1);
   }
};

if (process.argv[2] === "-d") {
   destroyData();
} else {
   importData();
}
