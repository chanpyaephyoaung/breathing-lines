import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Poem from "../../models/poemModel.js";
import User from "../../models/userModel.js";
import { seedPoemDummyData } from "../../poemSeederTest.js";
import users from "../../dummyData/users.js";
import Collection from "../../models/collectionModel.js";
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

describe("Integration tests for COLLECTIONS endpoints with database.", () => {
   beforeEach(async () => {
      await Poem.deleteMany({});
      await User.deleteMany({});
      await Collection.deleteMany({});
   });

   afterEach(async () => {
      await Poem.deleteMany({});
      await User.deleteMany({});
      await Collection.deleteMany({});
   });

   describe("POST /api/users/user-profile/:userId/collections", () => {
      it("Should create a new collection when signed in.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const collectionName = "Rasputin";

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .post(`/api/users/user-profile/${firstUserId}/collections`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ collectionName });

         assert.equal(res.status, 201);
         assert.isObject(res.body, "The response body (collection) should be an object.");
      });

      it("Should not create a new collection when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app).post(`/api/users/user-profile/${firstUserId}/collections`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("GET /api/users/user-profile/:userId/collections", () => {
      it("Should fetch the collections of a specific user when signed in.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/collections`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isArray(res.body, "The response body (collections) should be an array.");
      });

      it("Should not fetch the collections of a specific user when not signed in.", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app).post(`/api/users/user-profile/${firstUserId}/collections`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("GET /api/users/user-profile/:userId/collections/:collectionId", () => {
      it("Should fetch the a specific collection of a specific user when signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .post(`/api/users/user-profile/${firstUserId}/collections`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ collectionName: "Rasputin" });

         const res2 = await request(app)
            .get(`/api/users/user-profile/${firstUserId}/collections/${res.body._id}`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res2.status, 200);
         assert.isObject(res.body, "The response body (collections) should be an object.");
      });

      it("Should not fetch the a specific collection of a specific user when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app)
            .post(`/api/users/user-profile/${firstUserId}/collections`)
            .send({ collectionName: "Rasputin" });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("POST /api/users/user-profile/:userId/collections/:collectionId/add/poem/:poemId", () => {
      it("Should add a poem to a specific collection when signed in", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const collectionName = "Rasputin";

         const res = await request(app)
            .post(`/api/users/user-profile/${firstUserId}/collections/`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ collectionName });

         const res2 = await request(app)
            .post(
               `/api/users/user-profile/${firstUserId}/collections/${res.body._id}/add/poem/${samplePoemId}`
            )
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res2.status, 201);
         assert.property(res2.body, "message");
         assert.equal(
            res2.body.message,
            `Poem added to collection - ${collectionName} successfully.`
         );
      });

      it("Should not add a specific poem to a specific collection when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app)
            .post(`/api/users/user-profile/${firstUserId}/collections`)
            .send({ collectionName: "Rasputin" });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("DELETE /api/users/user-profile/:userId/collections/:collectionId/delete/poem/:poemId", () => {
      it("Should delete a poem from a specific collection when signed in and is the creator", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const collectionName = "Rasputin";

         const res = await request(app)
            .post(`/api/users/user-profile/${firstUserId}/collections/`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ collectionName });

         const res2 = await request(app)
            .post(
               `/api/users/user-profile/${firstUserId}/collections/${res.body._id}/add/poem/${samplePoemId}`
            )
            .set("Cookie", `jwt=${mockJwtToken}`);

         const res3 = await request(app)
            .delete(
               `/api/users/user-profile/${firstUserId}/collections/${res.body._id}/delete/poem/${samplePoemId}`
            )
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res3.status, 201);
         assert.property(res3.body, "message");
         assert.equal(
            res3.body.message,
            `Poem (${samplePoem.title}) removed from your collection - ${collectionName} successfully.`
         );
      });

      it("Should not delete a poem from a specific collection when signed in but is not the collection creator", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const secondUser = await User.findOne({ name: "Severus Snape" });
         const secondUserId = secondUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const mockJwtToken1 = generateJwtToken(firstUser);
         const mockJwtToken2 = generateJwtToken(secondUser);

         const collectionName = "Rasputin";

         const res = await request(app)
            .post(`/api/users/user-profile/${firstUserId}/collections/`)
            .set("Cookie", `jwt=${mockJwtToken1}`)
            .send({ collectionName });

         const res2 = await request(app)
            .post(
               `/api/users/user-profile/${firstUserId}/collections/${res.body._id}/add/poem/${samplePoemId}`
            )
            .set("Cookie", `jwt=${mockJwtToken1}`);

         const res3 = await request(app)
            .delete(
               `/api/users/user-profile/${secondUserId}/collections/${res.body._id}/delete/poem/${samplePoemId}`
            )
            .set("Cookie", `jwt=${mockJwtToken2}`);

         assert.equal(res3.status, 401);
         assert.property(res3.body, "errMessage");
         assert.equal(
            res3.body.errMessage,
            "You are not authorized to remove poems from this collection."
         );
      });

      it("Should not delete a specific poem from a specific collection when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app)
            .post(`/api/users/user-profile/${firstUserId}/collections`)
            .send({ collectionName: "Rasputin" });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("DELETE /api/users/user-profile/:userId/collections/:collectionId/", () => {
      it("Should delete a specific collection when signed in", async () => {
         await seedPoemDummyData();
         const firstUser = await User.findOne({ name: "Albus Dumbledore" });
         const firstUserId = firstUser._id;
         const samplePoem = await Poem.findOne({ title: "A Jelly-Fish" });
         const samplePoemId = samplePoem._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const collectionName = "Rasputin";

         const res = await request(app)
            .post(`/api/users/user-profile/${firstUserId}/collections/`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ collectionName });

         const res2 = await request(app)
            .delete(`/api/users/user-profile/${firstUserId}/collections/${res.body._id}`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res2.status, 200);
         assert.property(res2.body, "message");
         assert.equal(res2.body.message, `Collection deleted successfully.`);
      });

      it("Should not delete a specific collection when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app)
            .post(`/api/users/user-profile/${firstUserId}/collections`)
            .send({ collectionName: "Rasputin" });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });
});
