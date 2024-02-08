import jwt from "jsonwebtoken";

const generateJwtToken = (res, userId) => {
   const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "10d",
   });

   res.cookie("jwt", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development" || process.env.NODE_ENV === "test",
      maxAge: 10 * 24 * 3600 * 1000, //10 days
      sameSite: "strict",
   });
};

export default generateJwtToken;
