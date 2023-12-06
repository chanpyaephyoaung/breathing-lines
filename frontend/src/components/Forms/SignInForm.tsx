import React from "react";
import Input from "./Input/Input.tsx";
import Button from "../UI/Button.tsx";

const SignInForm = () => {
   return (
      <form className="grid gap-6">
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

         <Input size="lg" label="password" type="password" placeholder="password" showLabel={false}>
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
         </Input>

         <Button customStyle="primary" type="submit" size="lg">
            Sign In
         </Button>
      </form>
   );
};
export default SignInForm;
