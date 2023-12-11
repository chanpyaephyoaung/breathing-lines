import React from "react";
import { Link } from "react-router-dom";
import SignInForm from "../Forms/SignInForm.tsx";
import Divider from "../UI/Divider.tsx";
import FormContainer from "../UI/FormContainer.tsx";

const SignInSection = () => {
   return (
      <FormContainer>
         <h2 className="text-lg md:text-2xl font-bold text-clr-black">Sign In</h2>
         <SignInForm />
         <Divider />
         <p className="text-clr-black-faded text-xs md:text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-clr-primary font-normal hover:underline">
               Sign up
            </Link>
         </p>
      </FormContainer>
   );
};
export default SignInSection;
