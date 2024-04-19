import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Poem from "../../models/poemModel.js";
import { seedDummyData } from "../../seeder.js";
import User from "../../models/userModel.js";
import users from "../../dummyData/users.js";
import app from "../../server.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

   describe("GET api/users/user-profile/:userId", () => {
      it("Should retrieve the user profile of a user when signed in.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(existingUserId);

         const res = await request(app)
            .get(`/api/users/user-profile/${existingUserId}`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isObject(res.body, "The response body (user) should be an object.");
         assert.property(res.body.targetUser, "_id");
         assert.property(res.body.targetUser, "name");
         assert.property(res.body.targetUser, "email");
         assert.property(res.body.targetUser, "isAdmin");
         assert.property(res.body.targetUser, "profileDesc");
         assert.property(res.body.targetUser, "isBanned");
         assert.property(res.body.targetUser, "poems");
         assert.property(res.body.targetUser, "favoritedPoems");
         assert.property(res.body.targetUser, "collections");
         assert.property(res.body.targetUser, "profileReviews");
         assert.property(res.body.targetUser, "followers");
         assert.property(res.body.targetUser, "followings");
         assert.property(res.body.targetUser, "notifications");
         assert.property(res.body.targetUser, "unreadNotificationsCount");
         assert.property(res.body.targetUser, "poemRecommendations");
         assert.property(res.body, "encodedProfileImage");
      });

      it("Should not retrieve the user profile of a user who doesn't exist.", async () => {
         await User.insertMany(users);
         const notExistingUserId = "659f0a906bf7e2fa49254d99";

         const mockJwtToken = generateJwtToken(notExistingUserId);

         const res = await request(app)
            .get(`/api/users/user-profile/${notExistingUserId}`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 404);
         assert.equal(res.body.errMessage, "Current user not found!");
      });

      it("Should not retrieve the user profile of a user when NOT signed in.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const res = await request(app).get(`/api/users/user-profile/${existingUserId}`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("PUT api/users/user-profile/account/update", () => {
      it("Should update the account profile of an user when signed in.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(existingUserId);

         const updatedUser = {
            email: "nancy@gmail.com",
            password: "123abc",
         };

         const res = await request(app)
            .put(`/api/users/user-profile/account/update`)
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
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const updatedUser = {
            email: "nancy@gmail.com",
            password: "123abc",
         };

         const res = await request(app)
            .put(`/api/users/user-profile/${existingUserId}`)
            .send(updatedUser);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("PUT /api/users/user-profile/:userId", () => {
      it("Should update the 'user' profile of an user when signed in.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(existingUserId);

         const newProfileData = {
            name: "Nancy",
            profileImg: "uploads/nancy-selfie.jpg",
            profileDesc: "Hi, I am Nancy!",
         };

         const res = await request(app)
            .put(`/api/users/user-profile/${existingUserId}`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ newProfileData });

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
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const updatedUser = {
            name: "Nancy",
            profileImg: "uploads/nancy-selfie.jpg",
            profileDesc: "Hi, I am Nancy!",
         };

         const res = await request(app)
            .put(`/api/users/user-profile/${existingUserId}`)
            .send(updatedUser);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("PUT /api/users/:userId/profile-review", () => {
      it("Should leave a profile review on another user's profile when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const secondUserId = createdDumUsers[2]._id;

         const mockJwtToken = generateJwtToken(secondUserId);

         const review = "I love your poems!";

         const res = await request(app)
            .post(`/api/users/${firstUserId}/profile-review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ review });

         assert.equal(res.status, 201);
         assert.property(res.body, "message");
         assert.equal(res.body.message, "Profile Review added successfully!");
      });

      it("Should not leave a profile review on another user's profile when NOT signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const secondUserId = createdDumUsers[2]._id;

         const review = "I love your poems!";

         const res = await request(app)
            .post(`/api/users/${firstUserId}/profile-review`)
            .send({ review });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });

      it("Should not leave a profile review on another user's profile the current user has already made one.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const secondUserId = createdDumUsers[2]._id;

         const mockJwtToken = generateJwtToken(secondUserId);

         const review = "I love your poems!";

         const res = await request(app)
            .post(`/api/users/${firstUserId}/profile-review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ review });

         const res2 = await request(app)
            .post(`/api/users/${firstUserId}/profile-review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ review });

         assert.equal(res2.status, 400);
         assert.equal(res2.body.errMessage, "You have already made a review on this poem!");
      });
   });

   describe("PUT /api/users/:userId/view", () => {
      it("Should increase a user view count when accessing user profile by the signed-in user", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const secondUserId = createdDumUsers[2]._id;

         const mockJwtToken = generateJwtToken(secondUserId);

         const res = await request(app)
            .put(`/api/users/${secondUserId}/view`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ userId: firstUserId });

         assert.equal(res.status, 200);
         assert.property(res.body, "message");
         assert.equal(res.body.message, "View count increased!");
      });

      it("Should not increase a user view count when accessing user profile by the NON-SIGNED-IN user", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const secondUserId = createdDumUsers[2]._id;

         const res = await request(app)
            .put(`/api/users/${secondUserId}/view`)
            .send({ userId: firstUserId });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });

      it("Should not increase a user view count when the current signed-in user is also the target user", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .put(`/api/users/${firstUserId}/view`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ userId: firstUserId });

         assert.equal(res.status, 200);
         assert.property(res.body, "message");
         assert.equal(res.body.message, "View count not increased!");
      });
   });
});
