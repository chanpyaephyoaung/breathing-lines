import React from "react";
import FormContainer from "../UI/FormContainer.tsx";
import UploadPoemForm from "../Forms/UploadPoemForm.tsx";

const UploadPoemSection = () => {
   return (
      <FormContainer>
         <h2 className="text-lg md:text-2xl font-bold text-clr-black">Upload a Poem!</h2>
         <UploadPoemForm />
      </FormContainer>
   );
};
export default UploadPoemSection;
