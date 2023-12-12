import bcrypt from "bcryptjs";
import { poemSchema } from "../models/poemModel";

const users = [
   {
      name: "Admin User",
      email: "adminuser@gmail.com",
      password: bcrypt.hashSync("12345", 10),
      isAdmin: true,
   },
   {
      name: "Eric Clapton",
      email: "ericclapton@gmail.com",
      password: bcrypt.hashSync("12345", 10),
      isAdmin: false,
      poems: [poemSchema],
   },
   {
      name: "John Lennon",
      email: "johnlennon@gmail.com",
      password: bcrypt.hashSync("12345", 10),
      isAdmin: false,
      poems: [poemSchema],
   },
   {
      name: "Gloria Gaynor",
      email: "gloriagaynor@gmail.com",
      password: bcrypt.hashSync("12345", 10),
      isAdmin: false,
      poems: [poemSchema],
   },
];

export default users;
