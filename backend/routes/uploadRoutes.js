import express from "express";
import multer from "multer";
import { s3UploadV3 } from "../s3Service.js";

const router = express.Router();

// Multer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
   if (file.mimetype.split("/")[0] === "image") {
      cb(null, true);
   } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
   }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10000000, files: 1 } });

router.post("/", upload.single("file"), async (req, res) => {
   const file = req.file;
   try {
      const result = await s3UploadV3(file);
      res.json({ message: "Image successfully uploaded!", result });
   } catch (err) {
      throw new Error(err);
   }
});

export default router;
