import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Poem from "../../models/poemModel.js";
import { seedDummyData } from "../../seeder.js";
import User from "../../models/userModel.js";
import users from "../../dummyData/users.js";
import poems from "../../dummyData/poems.js";
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

   describe("PUT /api/users/:userId/subscribe", () => {
      it("Should follow other user when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const secondUserId = createdDumUsers[2]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .put(`/api/users/${secondUserId}/subscribe`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.property(res.body, "message");
         assert.equal(res.body.message, `You have now followed ${createdDumUsers[2].name}.`);
      });

      it("Should not follow the user when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const secondUserId = createdDumUsers[2]._id;

         const res = await request(app).put(`/api/users/${secondUserId}/subscribe`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });

      it("Should not follow yourself", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .put(`/api/users/${firstUserId}/subscribe`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 400);
         assert.property(res.body, "errMessage");
         assert.equal(res.body.errMessage, "You cannot subscribe to yourself!");
      });

      it("Should unfollow other user when signed in and already followed them", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const secondUserId = createdDumUsers[2]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .put(`/api/users/${secondUserId}/subscribe`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         const res2 = await request(app)
            .put(`/api/users/${secondUserId}/subscribe`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res2.status, 200);
         assert.property(res2.body, "message");
         assert.equal(res2.body.message, `You have now unfollowed ${createdDumUsers[2].name}.`);
      });
   });

   describe("GET /api/user-profile/:userId/poems/:status", () => {
      it("Should fetch all DRAFTED poems list of a user when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/poems/drafted`)
            .set("Cookie", `jwt=${mockJwtToken}`);
         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (poems) should be an array.");
      });
      it("The length of drafted poems should equal to 2", async () => {
         await seedDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/poems/drafted`)
            .set("Cookie", `jwt=${mockJwtToken}`);
         assert.equal(res.status, 200);
         assert.equal(res.body.length, 2);
      });
      it("Should not fetch DRAFTED poems of a user when non signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const res = await request(app).get(`/api/users/user-profile/${firstUserId}/poems/drafted`);
         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
      it("Should fetch all PUBLISHED poems list of a user when signed in", async () => {
         await seedDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/poems/published`)
            .set("Cookie", `jwt=${mockJwtToken}`);
         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (poems) should be an array.");
      });
      it("The length of published poems should equal to 28", async () => {
         await seedDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/poems/published`)
            .set("Cookie", `jwt=${mockJwtToken}`);
         assert.equal(res.status, 200);
         assert.equal(res.body.length, 28);
      });
      it("Should not fetch published poems of a user when non signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const res = await request(app).get(
            `/api/users/user-profile/${firstUserId}/poems/published`
         );
         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
      it("Should fetch all favorited poems list of a user when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/poems/favorites`)
            .set("Cookie", `jwt=${mockJwtToken}`);
         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (poems) should be an array.");
      });
      it("The length of favorited poems should equal to 0", async () => {
         await seedDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/poems/favorites`)
            .set("Cookie", `jwt=${mockJwtToken}`);
         assert.equal(res.status, 200);
         assert.equal(res.body.length, 0);
      });
      it("Should not fetch favorited poems of a user when non signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const res = await request(app).get(
            `/api/users/user-profile/${firstUserId}/poems/favorites`
         );
         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("GET /api/users/user-profile/:userId/followers", () => {
      it("Should retrieve the followers list of a user when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const review = "I love your poems!";

         const res = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/followers`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (followers) should be an array.");
      });

      it("The length of followers list array should equal to 0", async () => {
         await seedDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/followers`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.equal(res.body.length, 0);
      });

      it("Should not retrieve the followers list of an array when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app).get(`/api/users/user-profile/${firstUserId}/followers`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("GET /api/users/user-profile/:userId/followings", () => {
      it("Should retrieve the followings list of a user when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const review = "I love your poems!";
         const res = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/followings`)
            .set("Cookie", `jwt=${mockJwtToken}`);
         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (followings) should be an array.");
      });

      it("The length of followings list array should equal to 0", async () => {
         await seedDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/followings`)
            .set("Cookie", `jwt=${mockJwtToken}`);
         assert.equal(res.status, 200);
         assert.equal(res.body.length, 0);
      });

      it("Should not retrieve the followings list of an array when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const res = await request(app).get(`/api/users/user-profile/${firstUserId}/followings`);
         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("GET /api/users/:userId/notifications", () => {
      it("Should retrieve the all the notifications of a user when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .get(`/api/users/${firstUserId}/notifications`)
            .set("Cookie", `jwt=${mockJwtToken}`);
         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (notifications) should be an array.");
      });

      it("The length of notifications array should initially be 0", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .get(`/api/users/${firstUserId}/notifications`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.equal(res.body.length, 0);
      });

      it("Should not retrieve the notifications of a user when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app).get(`/api/users/${firstUserId}/notifications`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("POST /api/users/:userId/notifications/new", () => {
      it("Should create a new notification when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const secondUserId = createdDumUsers[2]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const newNotiData = {
            createdBy: firstUserId,
            receivedBy: secondUserId,
            notificationMessage: "Hello!",
            payload: null,
            notificationType: "like",
            createdAt: new Date(),
         };

         const res = await request(app)
            .post(`/api/users/${firstUserId}/notifications/new`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ newNotiData });

         assert.equal(res.status, 201);
         assert.isObject(res.body, "The response body (notification) should be an object.");
         assert.property(res.body, "_id");
         assert.property(res.body, "createdBy");
         assert.property(res.body, "receivedBy");
         assert.property(res.body, "notificationMessage");
         assert.property(res.body, "payload");
         assert.property(res.body, "notificationType");
         assert.property(res.body, "createdAt");
      });

      it("Should not create a new notification when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app).post(`/api/users/${firstUserId}/notifications/new`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });
   describe("POST /api/users/:userId/notifications/unread", () => {
      it("Should increase unread notification count of a user when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUser = createdDumUsers[1];
         const firstUserId = createdDumUsers[1]._id;

         assert.equal(firstUser.unreadNotificationsCount, 0);

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .post(`/api/users/:userId/notifications/unread`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ userId: firstUserId });

         assert.equal(res.status, 201);
         assert.isNumber(
            res.body,
            "The response body (unreadNotificationCount) should be an number."
         );
         assert.equal(res.body, 1);
      });

      it("Should set unread notification count of a user back to 0 when signed in and notification button is clicked", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUser = createdDumUsers[1];
         const firstUserId = createdDumUsers[1]._id;

         assert.equal(firstUser.unreadNotificationsCount, 0);

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .post(`/api/users/:userId/notifications/unread`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ userId: firstUserId, defaultCount: 0 });

         assert.equal(res.status, 201);
         assert.isNumber(
            res.body,
            "The response body (unreadNotificationCount) should be a number."
         );
         assert.equal(res.body, 0);
      });

      it("Should not increase the unread notification count when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app)
            .post(`/api/users/:userId/notifications/unread`)
            .send({ userId: firstUserId });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });

      it("Should not set the unread notification count back to 0 when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app)
            .post(`/api/users/:userId/notifications/unread`)
            .send({ userId: firstUserId, defaultCount: 0 });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("GET /api/users/:userId/notifications/unread", () => {
      it("Should retrieve unread notification count of a user when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .get(`/api/users/${firstUserId}/notifications/unread`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isNumber(
            res.body,
            "The response body (unreadNotificationCount) should be a number."
         );
         assert.equal(res.body, 0);
      });

      it("Should not retrieve unread notification count of a user when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app).get(`/api/users/${firstUserId}/notifications/unread`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("GET /api/users/:userId/poem-recommendations", () => {
      it("Should retrieve poem recommendations for a user when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .get(`/api/users/${firstUserId}/poem-recommendations`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (poem recommendations) should be an array.");
      });

      it("The length of poem recommendations array should initially be 0", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .get(`/api/users/${firstUserId}/poem-recommendations`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (poem recommendations) should be an array.");
         assert.equal(res.body.length, 0);
      });

      it("Should not retrieve poem recommendation for a user when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app).get(`/api/users/${firstUserId}/poem-recommendations`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });
});
