import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../Forms/SignUpForm.tsx";
import Divider from "../UI/Divider.tsx";
import FormContainer from "../UI/FormContainer.tsx";

const SignUpSection = () => {
   return (
      <FormContainer>
         <h2 className="text-lg md:text-2xl font-medium text-clr-black">Sign Up</h2>
         <SignUpForm />
         <Divider />
         <p className="text-clr-black-faded text-xs md:text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-clr-primary font-normal hover:underline">
               Sign in
            </Link>
         </p>
      </FormContainer>
   );
};
export default SignUpSection;
