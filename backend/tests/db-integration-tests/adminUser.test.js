import { assert } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import Poem from "../../models/poemModel.js";
import User from "../../models/userModel.js";
import users from "../../dummyData/users.js";
import { seedDummyData } from "../../seeder.js";
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

describe("Integration tests for ADMIN USER endpoints with database.", () => {
   beforeEach(async () => {
      await Poem.deleteMany({});
      await User.deleteMany({});
   });

   afterEach(async () => {
      await Poem.deleteMany({});
      await User.deleteMany({});
   });

   describe("GET /api/users/admin/usersList", () => {
      it("Should fetch a list of all users when signed in as an admin", async () => {
         const createdDumUsers = await User.insertMany(users);
         const adminUserId = createdDumUsers[0]._id;

         const mockJwtToken = generateJwtToken(adminUserId);

         const res = await request(app)
            .get(`/api/users/admin/usersList`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isObject(res.body, "The response body (users) should be an object.");
      });

      it("Should not fetch a list of all users when not signed in as an admin", async () => {
         const createdDumUsers = await User.insertMany(users);
         const adminUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(adminUserId);

         const res = await request(app)
            .get(`/api/users/admin/usersList`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 401);
      });

      it("Should not create a new collection when not signed in", async () => {
         const res = await request(app).get(`/api/users/admin/usersList`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("PUT /api/users/admin/:userId/ban", () => {
      it("Should be able to ban a user when signed in as an admin", async () => {
         const createdDumUsers = await User.insertMany(users);
         const adminUserId = createdDumUsers[0]._id;
         const firstUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(adminUserId);

         const res = await request(app)
            .put(`/api/users/admin/${firstUserId}/ban`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ userId: firstUserId });

         assert.equal(res.status, 201);
         assert.isObject(res.body, "The response body (users) should be an object.");
         assert.equal(res.body.message, "User banned successfully");
      });

      it("Should be not able to ban a user when signed not in as an admin", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;
         const secondUserId = createdDumUsers[2]._id;

         const mockJwtToken = generateJwtToken(firstUserId);

         const res = await request(app)
            .put(`/api/users/admin/${firstUserId}/ban`)
            .set("Cookie", `jwt=${mockJwtToken}`)
            .send({ userId: secondUserId });

         assert.equal(res.status, 401);
      });

      it("Should not create a new collection when not signed in", async () => {
         const createdDumUsers = await User.insertMany(users);
         const firstUserId = createdDumUsers[1]._id;

         const res = await request(app)
            .put(`/api/users/admin/${firstUserId}/ban`)
            .send({ userId: firstUserId });

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });

   describe("GET /api/users/admin/poemsList", () => {
      it("Should fetch a list of all poems when signed in as an admin", async () => {
         const createdDumUsers = await User.insertMany(users);
         const adminUserId = createdDumUsers[0]._id;

         const mockJwtToken = generateJwtToken(adminUserId);

         const res = await request(app)
            .get(`/api/users/admin/poemsList`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.isObject(res.body, "The response body (poems) should be an object.");
      });

      it("Should not fetch a list of all poems when not signed in as an admin", async () => {
         const createdDumUsers = await User.insertMany(users);
         const adminUserId = createdDumUsers[1]._id;

         const mockJwtToken = generateJwtToken(adminUserId);

         const res = await request(app)
            .get(`/api/users/admin/poemsList`)
            .set("Cookie", `jwt=${mockJwtToken}`);

         assert.equal(res.status, 401);
      });

      it("Should not fetch a list of all poems when not signed in", async () => {
         const res = await request(app).get(`/api/users/admin/poemsList`);

         assert.equal(res.status, 401);
         assert.equal(res.body.errMessage, "Unauthorised, token not presented.");
      });
   });
});
