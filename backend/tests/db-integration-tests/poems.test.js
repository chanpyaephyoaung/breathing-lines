import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Poem from "../../models/poemModel.js";
import { seedPoemDummyData } from "../../poemSeederTest.js";
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

const checkPoemProperties = (poem) => {
   assert.isObject(poem, "The response body (poem) should be an object.");
   assert.property(poem, "_id");
   assert.property(poem, "title");
   assert.property(poem, "content");
   assert.property(poem, "author");
   assert.property(poem, "genres");
   assert.property(poem, "coverImg");
   assert.property(poem, "publishedAt");
   assert.property(poem, "viewsCount");
   assert.property(poem, "likesCount");
   assert.property(poem, "status");
   assert.property(poem, "ratings");
   assert.property(poem, "reviews");
   assert.property(poem, "likes");
   assert.property(poem, "collections");
   assert.property(poem, "encodedCoverImg");
};

describe("Integration tests for POEMS endpoints with database.", () => {
   beforeEach(async () => {
      await Poem.deleteMany({});
      await User.deleteMany({});
   });

   afterEach(async () => {
      await Poem.deleteMany({});
      await User.deleteMany({});
   });

   describe("GET api/poems", () => {
      it("Should fetch all poems when signed in", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app).get("/api/poems").set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (user) should be an array when signed in");
      });

      it("Should fetch all poems with specific keyword 'the' when signed in", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .get("/api/poems")
            .query({ keyword: "the" })
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (user) should be an array.");
      });

      it("The length of the poems array with the keyword 'the' should be 12 when signed in", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .get("/api/poems")
            .query({ keyword: "the" })
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.equal(res.body.length, 12);
      });

      it("Should fetch all poems when not signed in", async () => {
         await seedPoemDummyData();

         const res = await request(app).get("/api/poems");

         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (user) should be an array.");
      });

      it("Should fetch all poems with specific keyword 'the' when not signed in", async () => {
         await seedPoemDummyData();

         const res = await request(app).get("/api/poems").query({ keyword: "the" });

         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (user) should be an array.");
      });

      it("The length of the poems array with the keyword 'the' should be 12 when not signed in", async () => {
         await seedPoemDummyData();

         const res = await request(app).get("/api/poems").query({ keyword: "the" });

         assert.equal(res.status, 200);
         assert.equal(res.body.length, 12);
      });
   });

   describe("GET api/poems/:poemId", () => {
      it("Should fetch a specific poem when signed in", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .get(`/api/poems/${samplePoemId}`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         checkPoemProperties(res.body);
      });

      it("Should not fetch a specific poem that does not exist when signed in", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoemId = "6625a3221282b3bafa0431b5";

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .get(`/api/poems/${samplePoemId}`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 404);
         assert.equal(res.body.errMessage, "Poem not found!");
      });

      it("Should fetch a specific poem when not signed in", async () => {
         await seedPoemDummyData();
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const res = await request(app).get(`/api/poems/${samplePoemId}`);

         assert.equal(res.status, 200);
         checkPoemProperties(res.body);
      });

      it("Should not fetch a specific poem that does not exist when not signed in", async () => {
         await seedPoemDummyData();

         const samplePoemId = "6625a3221282b3bafa0431b5";
         const res = await request(app).get(`/api/poems/${samplePoemId}`);

         assert.equal(res.status, 404);
         assert.equal(res.body.errMessage, "Poem not found!");
      });
   });

   describe("GET /api/poems/followings", () => {
      it("Should fetch poems from followings when signed in", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .get(`/api/poems/followings`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (poems) should be an array.");
      });

      it("Should not fetch a specific poem that does not exist when not signed in", async () => {
         await seedPoemDummyData();

         const res = await request(app).get(`/api/poems/followings`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("POST /api/poems/write", () => {
      it("Should be able to draft a poem when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUser = createdDumUsers[1];
         const firstUserId = firstUser._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const newPoem = {
            title: "Lily",
            content: "Lily lives in the sea",
            genres: ["Romance"],
            coverImg: "https://www.google.com",
            bgTheme: "circles",
            status: "drafted",
         };

         const res = await request(app)
            .post(`/api/poems/write`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send(newPoem);

         assert.equal(res.status, 201);
         assert.isObject(res.body, "The response body (poems) should be an object.");
         assert.equal(res.body.status, "drafted");
      });

      it("Should be able to publish a poem when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUser = createdDumUsers[1];
         const firstUserId = firstUser._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const newPoem = {
            title: "Lily",
            content: "Lily lives in the sea",
            genres: ["Romance"],
            coverImg: "https://www.google.com",
            bgTheme: "circles",
            status: "published",
         };

         const res = await request(app)
            .post(`/api/poems/write`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send(newPoem);

         assert.equal(res.status, 201);
         assert.isObject(res.body, "The response body (poems) should be an object.");
         assert.equal(res.body.status, "published");
      });

      it("Should not be able to write a poem when not signed in", async () => {
         const newPoem = {
            title: "Lily",
            content: "Lily lives in the sea",
            genres: ["Romance"],
            coverImg: "https://www.google.com",
            bgTheme: "circles",
            status: "published",
         };

         const res = await request(app).post(`/api/poems/write`).send(newPoem);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("PUT /api/poems/:poemId/edit", () => {
      it("Should be able to edit a poem when signed in and the current user is the author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const newPoemData = {
            title: "Lily",
            content: "Lily lives in the sea",
            genres: ["Love"],
            coverImg: "https://www.google.com",
            bgTheme: "circles",
         };

         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/edit`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ newPoemData });

         assert.equal(res.status, 201);
         assert.isObject(res.body, "The response body (poems) should be an object.");
         assert.equal(res.body.title, "Lily");
         assert.equal(res.body.content, "Lily lives in the sea");
         assert.deepEqual(res.body.genres, ["Love"]);
         assert.equal(res.body.coverImg, "https://www.google.com");
         assert.equal(res.body.bgTheme, "circles");
      });

      it("Should not be able to edit a poem when not signed in", async () => {
         await seedPoemDummyData();
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const newPoemData = {
            title: "Lily",
            content: "Lily lives in the sea",
            genres: ["Love"],
            coverImg: "https://www.google.com",
            bgTheme: "circles",
         };

         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/edit`)
            .send({ newPoemData });

         assert.equal(res.status, 401);
         //    assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });

      it("Should not be able to edit a poem when signed in but is not the author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Severus Snape" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const newPoemData = {
            title: "Lily",
            content: "Lily lives in the sea",
            genres: ["Love"],
            coverImg: "https://www.google.com",
            bgTheme: "circles",
         };

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/edit`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ newPoemData });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "You are not allowed to modify this poem.");
      });
   });

   describe("PUT /api/poems/:poemId/change-status", () => {
      it("Should be able to change the poem status when signed in and is the author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const newPoemStatus = "drafted";
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/change-status`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ newPoemStatus });
         assert.equal(res.status, 201);
         assert.isObject(res.body, "The response body (poems) should be an object.");
         assert.equal(res.body.message, `Poem ${newPoemStatus} successfully.`);
      });
      it("Should be able to change the poem status when signed in but is not the author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Severus Snape" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const newPoemStatus = "drafted";
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/change-status`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ newPoemStatus });
         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "You are not allowed to modify this poem.");
      });
      it("Should not be able to change the poem status when not signed in", async () => {
         await seedPoemDummyData();
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const newPoemData = "drafted";
         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/change-status`)
            .send({ newPoemData });
         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("DELETE /api/poems/:poemId", () => {
      it("Should be able to delete the poem when signed in and is the author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .delete(`/api/poems/${samplePoemId}`)
            .set("Cookie", `jwt=${mockJwtToken}`);
         assert.equal(res.status, 200);
         assert.equal(res.body.message, `Poem deleted successfully.`);
      });
      it("Should not be able to delete the poem when signed in but is not the author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Severus Snape" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const res = await request(app)
            .delete(`/api/poems/${samplePoemId}`)
            .set("Cookie", `jwt=${mockJwtToken}`);
         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "You are not allowed to modify this poem.");
      });
      it("Should not be able to delete the poem when not signed in", async () => {
         await seedPoemDummyData();
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const res = await request(app).delete(`/api/poems/${samplePoemId}`);
         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("PUT /api/poems/:poemId/like", () => {
      it("Should be able to like their own poem when signed in and is the author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         assert.equal(samplePoem.likesCount, 0);

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/like`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isNumber(res.body.likesCount, "The likesCount should be a number.");
         assert.equal(res.body.likesCount, 1);
      });

      it("Should be able to like other poems when signed in", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Severus Snape" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         assert.equal(samplePoem.likesCount, 0);

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/like`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isNumber(res.body.likesCount, "The likesCount should be a number.");
         assert.equal(res.body.likesCount, 1);
      });
      it("Should not be able to like the poem when not signed in", async () => {
         await seedPoemDummyData();
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const res = await request(app).put(`/api/poems/${samplePoemId}/like`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("PUT /api/poems/:poemId/rate", () => {
      it("Should be able to rate other poems when signed in and is not the author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Severus Snape" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const rating = 4;

         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/rate`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ rating });

         assert.equal(res.status, 201);
         assert.isNumber(res.body.rating, "The rating should be a number.");
         assert.equal(res.body.rating, 4);
      });

      it("Should be not able to rate other poems when signed in but the author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const rating = 4;

         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/rate`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ rating });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "You are not allowed to modify this poem.");
      });

      it("Should be not able to rate other poems when signed in but is a banned user", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         await firstUser.updateOne({ isBanned: true });
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const rating = 4;

         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/rate`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ rating });

         assert.equal(res.status, 403);
         assert.equal(res.body.errMessage, "You are banned from writing poems.");
      });

      it("Should not be able to rate the poem when not signed in", async () => {
         await seedPoemDummyData();
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const res = await request(app).put(`/api/poems/${samplePoemId}/rate`).send({
            rating: 4,
         });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("POST /api/poems/:poemId/review", () => {
      it("Should be able to review other poems when signed in and is not the author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Severus Snape" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const review = "Good!";
         const res = await request(app)
            .post(`/api/poems/${samplePoemId}/review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ review });
         assert.equal(res.status, 201);
         assert.property(res.body, "message");
         assert.equal(res.body.message, "Review added successfully!");
      });
      it("Should not be able to review other poems when signed in and already reviewed by the same user", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Severus Snape" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const review = "Good!";
         const res = await request(app)
            .post(`/api/poems/${samplePoemId}/review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ review });
         const res2 = await request(app)
            .post(`/api/poems/${samplePoemId}/review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ review });
         assert.equal(res2.status, 400);
         assert.equal(res2.body.errMessage, "You have already made a review on this poem!");
      });
      it("Should not be able to review one's own poems when signed in", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const review = "Good!";
         const res = await request(app)
            .post(`/api/poems/${samplePoemId}/review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ review });
         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "You are not allowed to modify this poem.");
      });
      it("Should be not able to review other poems when signed in but is a banned user", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Severus Snape" });
         const firstUserId = firstUser._id;
         await firstUser.updateOne({ isBanned: true });
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const mockJwtToken = generateJwtToken(firstUserId);
         const review = "Good!";
         const res = await request(app)
            .put(`/api/poems/${samplePoemId}/review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ review });
         assert.equal(res.status, 403);
         assert.equal(res.body.errMessage, "You are banned from editing poems.");
      });
      it("Should not be able to review the poem when not signed in", async () => {
         await seedPoemDummyData();
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const res = await request(app).put(`/api/poems/${samplePoemId}/review`).send({
            review: "Hello",
         });
         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });
   describe("PUT /api/poems/:poemId/review", () => {
      it("Should not be able to edit review on own poems when signed in", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const mockJwtToken = generateJwtToken(firstUserId);

         const review = "Good!";
         const res = await request(app)
            .post(`/api/poems/${samplePoemId}/review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ review });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "You are not allowed to modify this poem.");
      });

      it("Should be able to edit own review on other poems when signed in but is not an author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Severus Snape" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const mockJwtToken = generateJwtToken(firstUserId);

         const review = "Good!";
         const res = await request(app)
            .post(`/api/poems/${samplePoemId}/review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ review });

         const updatedReview = "Very good!";
         const res2 = await request(app)
            .put(`/api/poems/${samplePoemId}/review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ updatedReview });

         assert.equal(res2.status, 201);
         assert.isObject(res2.body, "The response body (updated review) should be an object.");
      });

      it("Should not be able to review the poem when not signed in", async () => {
         await seedPoemDummyData();
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const res = await request(app).put(`/api/poems/${samplePoemId}/review`).send({
            review: "Hello",
         });
         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("DELETE /api/poems/:poemId/review", () => {
      it("Should be able to delete own review on other poems when signed in but is not an author", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Severus Snape" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .post(`/api/poems/${samplePoemId}/review`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ review: "Good!" });

         const res2 = await request(app)
            .delete(`/api/poems/${samplePoemId}/review`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res2.status, 200);
         assert.isObject(res2.body, "The response body (updated review) should be an object.");
         assert.equal(res2.body.message, "Poem review deleted successfully!");
      });

      it("Should not be able to delete poem review when not signed in", async () => {
         await seedPoemDummyData();
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;
         const res = await request(app).delete(`/api/poems/${samplePoemId}/review`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });

      describe("PUT /api/poems/:poemId/view", () => {
         it("Should be able to increase the poem view count when viewed", async () => {
            await seedPoemDummyData();
            const firstUser = await User.findOne({ name: "Severus Snape" });
            const firstUserId = firstUser._id;
            const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
            const samplePoemId = samplePoem._id;
            const mockJwtToken = generateJwtToken(firstUserId);

            const res = await request(app)
               .put(`/api/poems/${samplePoemId}/view`)
               .set("Cookie", `jwt=${mockJwtToken}`)
               .send({ poemId: samplePoemId });

            assert.equal(res.status, 200);
            assert.equal(res.body.message, "View count increased!");
         });
      });
   });
});
