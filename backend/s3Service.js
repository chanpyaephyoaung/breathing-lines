import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const s3UploadV3 = async (file) => {
   const s3client = new S3Client();

   const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
   };

   const res = await s3client.send(new PutObjectCommand(params));
   return {
      ...res,
      fileKey: `${params["Key"]}`,
   };
};

export const s3RetrieveV3 = async (fileKey) => {
   const s3client = new S3Client();
   console.log(s3client);

   const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
   };

   return await s3client.send(new GetObjectCommand(params));
};
