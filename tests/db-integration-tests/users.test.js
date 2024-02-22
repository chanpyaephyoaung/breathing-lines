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
      it("Should sign in the user with correct credentials", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const user = {
            email: "albus@gmail.com",
            password: "123abc",
         };

         const mockJwtToken = generateJwtToken(existingUserId);

         const res = await request(app)
            .post("/api/users/signin")
            .set("Cookie", `jwtCookie=${mockJwtToken}`)
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
            .set("Cookie", `jwtCookie=${mockJwtToken}`)
            .send(user);

         assert.equal(res.status, 401);
      });

      it("Should not sign in the user with wrong password", async () => {
         const createdDumUsers = await User.insertMany(users);
         const existingUserId = createdDumUsers[1]._id;

         const user = {
            email: "albus@gmail.com",
            password: "999", // wrong password
         };

         const mockJwtToken = generateJwtToken(existingUserId);

         const res = await request(app)
            .post("/api/users/signin")
            .set("Cookie", `jwtCookie=${mockJwtToken}`)
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

      it("Should not register a new user whose email collides with one of the existing users'", async () => {
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

      it("Should not register a new user when name/username field is not filled", async () => {
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

      it("Should not register a new user when email field is not filled", async () => {
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

      it("Should not register a new user when password field is not filled", async () => {
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
            .set("Cookie", `jwtCookie=${mockJwtToken}`);

         assert.equal(res.status, 200);
         assert.equal(res.body.message, "Signed out successfully!");
      });
   });
});
