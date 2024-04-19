import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
dotenv.config({ path: "../.env.test" });

const connectDB = async () => {
   try {
      const mongoDbUri =
         process.env.NODE_ENV === "test"
            ? process.env.MONGOATLAS_URI_TEST
            : process.env.MONGOATLAS_URI;
      console.log(mongoDbUri);
      const connection = await mongoose.connect(mongoDbUri);

      console.log(
         `MONGODB ATLAS Connected: ${
            process.env.NODE_ENV === "test" ? "" : connection.connection.host
         }`
      );
   } catch (err) {
      console.log(`Error occurred: ${err.message}`);
      process.exit(1);
   }
};

export default connectDB;
