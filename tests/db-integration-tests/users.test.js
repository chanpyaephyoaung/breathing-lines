import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Poem from "../../backend/models/poemModel.js";
import { seedDummyData } from "../../backend/seeder.js";
import User from "../../backend/models/userModel.js";
import users from "../../backend/dummyData/users.js";
import app from "../../backend/server.js";
import jwt from "jsonwebtoken";

process.env.NODE_ENV = "test";

const generateJwtToken = (userId) => {
   const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "10d",
   });

   return jwtToken;
};

describe("Integration tests for USERS endpoints with database.", () => {
   beforeEach(async () => {
      await Poem.deleteMany({});
      await User.deleteMany({});
   });

   afterEach(async () => {
      await Poem.deleteMany({});
      await User.deleteMany({});
   });

   describe("POST api/users/signin", () => {
      it("Should sign in the user with correct credentials.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const user = {
            email: "albus@gmail.com",
            password: "123abc",
         };

         const mockJwtToken = generateJwtToken(existingUserId);

         const res = await request(app)
            .post("/api/users/signin")
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send(user);

         assert.equal(res.status, 200);
         assert.isObject(res.body, "The response body (user) should be an object.");
         assert.property(res.body, "_id");
         assert.property(res.body, "isAdmin");
         assert.property(res.body, "name");
         assert.property(res.body, "email");
      });

      it("Should not sign in the user with wrong email", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const user = {
            email: "albuses@gmail.com", // wrong email
            password: "123abc",
         };

         const mockJwtToken = generateJwtToken(existingUserId);

         const res = await request(app)
            .post("/api/users/signin")
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send(user);

         assert.equal(res.status, 401);
      });

      it("Should not sign in the user with wrong password.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const user = {
            email: "albus@gmail.com",
            password: "999", // wrong password
         };

         const mockJwtToken = generateJwtToken(existingUserId);

         const res = await request(app)
            .post("/api/users/signin")
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send(user);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Invalid email or password!");
      });
   });

   describe("POST api/users/register", () => {
      it("Should register a new user with all required fields filled.", async () => {
         const sampleUser = {
            name: "Hermoine Granger",
            email: "hermoine@gmail.com",
            password: "123abc",
         };

         const res = await request(app).post("/api/users/register").send(sampleUser);

         assert.equal(res.status, 201);
         assert.isObject(res.body, "The response body (user) should be an object.");
         assert.property(res.body, "_id");
         assert.property(res.body, "name");
         assert.property(res.body, "email");
         assert.property(res.body, "isAdmin");
      });

      it("Should not register a new user whose email collides with one of the existing users'.", async () => {
         await User.insertMany(users);

         const user = {
            name: "Albus dumbledore",
            email: "albus@gmail.com",
            password: "123abc",
         };

         const res = await request(app).post("/api/users/register").send(user);

         assert.equal(res.status, 400);
         assert.equal(res.body.errMessage, "User is already registered!");
      });

      it("Should not register a new user when name/username field is not filled.", async () => {
         await User.insertMany(users);

         const user = {
            email: "tom@gmail.com",
            password: "123abc",
         };

         const res = await request(app).post("/api/users/register").send(user);

         assert.equal(res.status, 500);
         assert.equal(
            res.body.errMessage,
            "User validation failed: name: Path `name` is required."
         );
      });

      it("Should not register a new user when email field is not filled.", async () => {
         await User.insertMany(users);

         const user = {
            name: "Tom Riddle",
            password: "123abc",
         };

         const res = await request(app).post("/api/users/register").send(user);

         assert.equal(res.status, 500);
         assert.equal(
            res.body.errMessage,
            "User validation failed: email: Path `email` is required."
         );
      });

      it("Should not register a new user when password field is not filled.", async () => {
         await User.insertMany(users);

         const user = {
            name: "Tom Riddle",
            email: "tom@gmail.com",
         };

         const res = await request(app).post("/api/users/register").send(user);

         assert.equal(res.status, 500);
         assert.equal(
            res.body.errMessage,
            "User validation failed: password: Path `password` is required."
         );
      });
   });

   describe("POST api/users/signout", () => {
      it("Should sign out the user.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(existingUserId);

         const res = await request(app)
            .post("/api/users/signout")
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.equal(res.body.message, "Signed out successfully!");
      });
   });

   describe("GET api/users/account-profile", () => {
      it("Should retrieve the account profile of a user when signed in.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(existingUserId);

         const res = await request(app)
            .get("/api/users/account-profile")
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isObject(res.body, "The response body (user) should be an object.");
         assert.property(res.body.currentUser, "_id");
         assert.property(res.body.currentUser, "name");
         assert.property(res.body.currentUser, "email");
         assert.property(res.body.currentUser, "isAdmin");
         assert.property(res.body.currentUser, "profileDesc");
         assert.property(res.body.currentUser, "isBanned");
         assert.property(res.body.currentUser, "poems");
         assert.property(res.body.currentUser, "collections");
         assert.property(res.body.currentUser, "profileReviews");
         assert.property(res.body.currentUser, "followers");
         assert.property(res.body.currentUser, "followings");
         assert.property(res.body.currentUser, "notifications");
         assert.property(res.body, "encodedProfileImage");
      });

      it("Should not retrieve the account profile of a user who doesn't exist.", async () => {
         await User.insertMany(users);
         const notExistingUserId = "659f0a906bf7e2fa49254d99";

         const mockJwtToken = generateJwtToken(notExistingUserId);

         const res = await request(app)
            .get("/api/users/account-profile")
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 404);
         assert.equal(res.body.errMessage, "Current user not found!");
      });

      it("Should not retrieve the account profile of a user when NOT signed in.", async () => {
         await User.insertMany(users);

         const res = await request(app).get("/api/users/account-profile");

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });
   describe("PUT api/users/account-profile", () => {
      it("Should update the account profile of an user when signed in.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(existingUserId);

         const updatedUser = {
            email: "nancy@gmail.com",
            password: "123abc",
         };

         const res = await request(app)
            .put("/api/users/account-profile")
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send(updatedUser);

         assert.equal(res.status, 200);
         assert.isObject(res.body, "The response body (user) should be an object.");
         assert.property(res.body, "_id");
         assert.property(res.body, "name");
         assert.property(res.body, "email");
         assert.equal(res.body.email, "nancy@gmail.com");
         assert.property(res.body, "isAdmin");
      });

      it("Should not update the account profile of an user when NOT signed in.", async () => {
         await User.insertMany(users);

         const updatedUser = {
            email: "nancy@gmail.com",
            password: "123abc",
         };

         const res = await request(app).put("/api/users/account-profile").send(updatedUser);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("PUT api/users/user-profile", () => {
      it("Should update the 'user' profile of an user when signed in.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(existingUserId);

         const updatedUser = {
            name: "Nancy",
            profileImg: "uploads/nancy-selfie.jpg",
            profileDesc: "Hi, I am Nancy!",
         };

         const res = await request(app)
            .put("/api/users/user-profile")
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send(updatedUser);

         assert.equal(res.status, 200);
         assert.isObject(res.body, "The response body (user) should be an object.");
         assert.property(res.body, "_id");
         assert.property(res.body, "name");
         assert.equal(res.body.name, "Nancy");
         assert.property(res.body, "email");
         assert.property(res.body, "isAdmin");
         assert.property(res.body, "profileImg");
         assert.equal(res.body.profileImg, "uploads/nancy-selfie.jpg");
         assert.property(res.body, "profileDesc");
         assert.equal(res.body.profileDesc, "Hi, I am Nancy!");
      });

      it("Should not update the 'user' profile of an user when NOT signed in.", async () => {
         await User.insertMany(users);

         const updatedUser = {
            name: "Nancy",
            profileImg: "uploads/nancy-selfie.jpg",
            profileDesc: "Hi, I am Nancy!",
         };

         const res = await request(app).put("/api/users/user-profile").send(updatedUser);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });
});
