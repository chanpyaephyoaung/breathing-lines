import React from "react";
import Input from "./Input/Input.tsx";
import Button from "../UI/Button.tsx";

const SignUpForm = () => {
   return (
      <form className="grid gap-6">
         <Input size="lg" label="username" type="text" placeholder="username" showLabel={false}>
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
         </Input>

         <Input
            size="lg"
            label="email address"
            type="email"
            placeholder="email address"
            showLabel={false}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
         </Input>

         <Input
            size="lg"
            label="passwword"
            type="password"
            placeholder="password"
            showLabel={false}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
         </Input>

         <Input
            size="lg"
            label="passwword"
            type="password"
            placeholder="password"
            showLabel={false}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
         </Input>

         <Button customStyle="primary" type="submit" size="lg">
            Sign In
         </Button>
      </form>
   );
};
export default SignUpForm;
