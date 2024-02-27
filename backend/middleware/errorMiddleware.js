import multer from "multer";

const notFound = (req, res, next) => {
   const error = new Error(`Not Found - ${req.originalUrl}`);
   res.status(404);
   next(error);
};

const errorHandler = (err, req, res, next) => {
   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   let errMessage = err.message;

   // Check for Mongoose Cast Error
   if (err.name == "CastError" && err.kind === "ObjectId") {
      errMessage = "Resource Not Found!";
      statusCode = 404;
   }

   // Check for multer error
   if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
         errMessage = "File is too large.";
         statusCode = 413;
      }

      if (err.code === "LIMIT_FILE_COUNT") {
         errMessage = "File limit reached. Please upload only one image.";
         statusCode = 429;
      }

      if (err.code === "LIMIT_UNEXPECTED_FILE") {
         errMessage = "Unexpected file. Only images can be uploaded.";
         statusCode = 400;
      }
   }

   res.status(statusCode).json({
      errMessage,
      stack: process.env.NODE_ENV === "production" ? "🍔" : err.stack,
   });
};

export { notFound, errorHandler };
