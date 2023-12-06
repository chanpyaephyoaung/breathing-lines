import React from "react";
import SignUpForm from "../Forms/SignUpForm.tsx";
import Divider from "../UI/Divider.tsx";
import FormContainer from "../UI/FormContainer.tsx";

const SignUpSection = () => {
   return (
      <FormContainer>
         <h2 className="text-lg font-medium text-clr-black">Sign Up</h2>
         <SignUpForm />
         <Divider />
         <p className="text-clr-black-faded text-xs">
            Already have an account?{" "}
            <a href=" " className="text-clr-primary font-normal hover:underline">
               Sign in
            </a>
         </p>
      </FormContainer>
   );
};
export default SignUpSection;
