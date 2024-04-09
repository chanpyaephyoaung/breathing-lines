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
import collectionRoutes from "./routes/collectionRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import { s3UploadV3 } from "./s3Service.js";
import { Server } from "socket.io";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3001;

// Connect to MongoDB Atlas in development env
if (process.env.NODE_ENV !== "test") {
   connectDB();
}

const app = express();
const server = createServer(app);

// Cors
app.use(cors());

// Socket IO
const io = new Server(server, {
   cors: {
      origin: "http://localhost:3000",
   },
});

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
app.use("/api/users/user-profile", collectionRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

let onlineUsersList = [];

const addNewOnlineUser = (userId, socketId) => {
   if (!onlineUsersList.some((user) => user.userId === userId)) {
      onlineUsersList.push({ userId, socketId });
   }
};

const removeOnlineUser = (socketId) => {
   onlineUsersList = onlineUsersList.filter((user) => user.socketId !== socketId);
};

const removeNullOnlineUser = () => {
   onlineUsersList = onlineUsersList.filter((user) => user.userId !== null);
};

const getUser = (userId) => {
   return onlineUsersList.find((user) => user.userId === userId);
};

io.on("connection", async (socket) => {
   console.log("a user connected", socket.id);

   socket.on("newUser", (userId) => {
      addNewOnlineUser(userId, socket.id);
      removeNullOnlineUser();
      console.log(onlineUsersList);
   });

   socket.on("disconnect", () => {
      removeOnlineUser(socket.id);
   });
});

if (process.env.NODE_ENV !== "test") {
   server.listen(port, () => console.log(`Server running on port ${port}!!!`));
}

export default app;
