import React from "react";
import Input from "./Input/Input.tsx";
import TextArea from "./Input/TextArea.tsx";
import Button from "../UI/Button.tsx";

const UploadPoemForm = () => {
   return (
      <form className="grid gap-6">
         <Input size="" label="Title" type="text" placeholder="" showLabel={true}>
            &nbsp;
         </Input>

         <TextArea label="Content" />

         <Input size="" label="Genre Tags" type="text" placeholder="nature, love" showLabel={true}>
            &nbsp;
         </Input>

         <div className="w-full justify-center flex gap-x-4">
            <Button customStyle="black" type="submit" size="sm">
               Discard
            </Button>
            <Button customStyle="secondary" type="submit" size="sm">
               Draft
            </Button>
            <Button customStyle="primary" type="submit" size="sm">
               Publish
            </Button>
         </div>
      </form>
   );
};
export default UploadPoemForm;
