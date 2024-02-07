import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/database.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import poemRoutes from "./routes/poemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";

const port = process.env.PORT || 3001;

// Connect to MongoDB Atlas
connectDB();

const app = express();

app.get("/", (req, res) => {
   res.send("API is running");
});

app.use("/api/poems", poemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/admin", adminUserRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}!!!`));
