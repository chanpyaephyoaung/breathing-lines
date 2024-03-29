import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { createServer } from "node:http";
import connectDB from "./config/database.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import poemRoutes from "./routes/poemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import { s3UploadV3 } from "./s3Service.js";

dotenv.config();

const port = process.env.PORT || 3001;

// Connect to MongoDB Atlas in development env
if (process.env.NODE_ENV !== "test") {
   connectDB();
}

const app = express();
const server = createServer(app);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
   res.send("API is running");
});

app.use("/api/poems", poemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/admin", adminUserRoutes);
app.use("/api/upload", uploadRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
   server.listen(port, () => console.log(`Server running on port ${port}!!!`));
}

export default app;
