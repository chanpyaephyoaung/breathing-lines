import React from "react";
import SignInForm from "../Forms/SignInForm.tsx";
import Divider from "../UI/Divider.tsx";
import FormContainer from "../UI/FormContainer.tsx";

const SignInSection = () => {
   return (
      <FormContainer>
         <h2 className="text-lg font-bold text-clr-black">Sign In</h2>
         <SignInForm />
         <Divider />
         <p className="text-clr-black-faded text-xs">
            Don't have an account?{" "}
            <a href=" " className="text-clr-primary font-normal hover:underline">
               Sign up
            </a>
         </p>
      </FormContainer>
   );
};
export default SignInSection;
