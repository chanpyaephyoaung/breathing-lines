import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const s3UploadV3 = async (file) => {
   const s3client = new S3Client();

   const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
   };

   return s3client.send(new PutObjectCommand(param));
};
