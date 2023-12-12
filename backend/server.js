import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import poemRoutes from "./routes/poemRoutes.js";

dotenv.config();

const port = process.env.PORT || 3001;

connectDB(); // Connect to MongoDB Atlas
const app = express();

app.get("/", (req, res) => {
   res.send("API is running");
});

app.use("/api/poems", poemRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}!!!`));
