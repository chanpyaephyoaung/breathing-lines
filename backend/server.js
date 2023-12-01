import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
   res.send("API is running!!");
});

app.listen(port, () => console.log(`Server running on port ${port}!!!`));
