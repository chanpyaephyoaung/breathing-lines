import express from "express";
import dotenv from "dotenv";
import { dummyPoems } from "./data/sampleData.js";

dotenv.config();

console.log(process.env.NODE_ENV);
console.log(process.env.PORT);

const port = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
   res.send("API is running");
});

app.get("/api/poems", (req, res) => {
   res.json(dummyPoems);
});

app.listen(port, () => console.log(`Server running on port ${port}!!!`));
