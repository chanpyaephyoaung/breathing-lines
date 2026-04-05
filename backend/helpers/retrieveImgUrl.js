import { getSignedImageUrl } from "../s3Service.js";

const retrieveImgUrl = async (key) => {
   let image = "";
   if (key) {
      // Just for testing purpose. Remove the second condition in production
      image = await getSignedImageUrl(key);
   }

   return image;
};

export default retrieveImgUrl;
