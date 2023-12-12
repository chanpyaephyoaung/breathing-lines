import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const connection = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongDB Connected: ${connection.connection.host}`);
   } catch (err) {
      console.log(`Error: ${err.message}`);
      process.exit(1);
   }
};

export default connectDB;
