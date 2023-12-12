import express from "express";
import dotenv from "dotenv";
import { poems } from "./data/poems.js";
import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 3001;

connectDB(); // Connect to MongoDB Atlas
const app = express();

app.get("/", (req, res) => {
   res.send("API is running");
});

app.get("/api/poems", (req, res) => {
   res.json(poems);
});

app.get("/api/poems/:poemId", (req, res) => {
   const poem = poems.find((p) => p.id === req.params.poemId);
   res.json(poem);
});

app.listen(port, () => console.log(`Server running on port ${port}!!!`));
