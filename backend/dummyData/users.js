import bcrypt from "bcryptjs";

const dummyUsers = [
   {
      name: "Admin",
      isAdmin: true,
      email: "admin@gmail.com",
      password: bcrypt.hashSync("123abc", 10),
   },
   {
      name: "Albus Dumbledore",
      email: "albus@gmail.com",
      password: bcrypt.hashSync("123abc", 10),
   },
   {
      name: "Severus Snape",
      email: "severus@gmail.com",
      password: bcrypt.hashSync("123abc", 10),
   },
];

export default dummyUsers;
