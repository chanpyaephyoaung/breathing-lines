import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "node:http";
import connectDB from "./config/database.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import poemRoutes from "./routes/poemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";

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

// Middleware
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
   server.listen(port, () => console.log(`Server running on port ${port}!!!`));
}

export default app;
