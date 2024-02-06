import mongoose, { connect } from "mongoose";

const connectDB = async () => {
   try {
      const connection = await mongoose.connect(process.env.MONGODB_ATLAS_URI);
      console.log(`MONGODB ATLAS Connected: ${connection.connection.host}`);
   } catch (err) {
      console.log(`Error: ${err.message}`);
      process.exit(1);
   }
};

export default connectDB;
