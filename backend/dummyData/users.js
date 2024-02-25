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
      profileDesc:
         "Remember, if the time should come when you have to make a choice between what is right and what is easy, remember what happened to a boy who was good, and kind, and brave, because he strayed across the path of Lord Voldemort. Remember Cedric Diggory.",
   },
   {
      name: "Lord Voldemort",
      email: "voldemort@gmail.com",
      password: bcrypt.hashSync("123abc", 10),
   },
   {
      name: "Severus Snape",
      email: "severus@gmail.com",
      password: bcrypt.hashSync("123abc", 10),
   },
];

export default dummyUsers;
