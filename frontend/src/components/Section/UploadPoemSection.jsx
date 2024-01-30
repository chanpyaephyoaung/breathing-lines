import FormContainer from "../UI/FormContainer.jsx";
import UploadPoemForm from "../Forms/UploadPoemForm.jsx";

const UploadPoemSection = () => {
   return (
      <FormContainer>
         <h2 className="text-lg md:text-2xl font-bold text-clr-black">Upload a Poem!</h2>
         <UploadPoemForm />
      </FormContainer>
   );
};
export default UploadPoemSection;
