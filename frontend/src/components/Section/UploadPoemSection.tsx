import React from "react";
import FormContainer from "../UI/FormContainer.tsx";
import UploadPoemForm from "../Forms/UploadPoemForm.tsx";

const UploadPoemSection = () => {
   return (
      <FormContainer>
         <h2 className="text-lg font-bold text-clr-black">Sign In</h2>
         <UploadPoemForm />
      </FormContainer>
   );
};
export default UploadPoemSection;
