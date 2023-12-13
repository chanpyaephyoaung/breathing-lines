import React from "react";
import FormContainer from "../components/UI/FormContainer.tsx";
import Button from "../components/UI/Button.tsx";

const WritePoemPage = () => {
   return (
      <FormContainer>
         <h2 className="text-lg md:text-2xl font-bold text-clr-black">Upload a Poem!</h2>

         <form className="grid gap-6">
            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">Title</span>
               <p className="capitalize text-base font-medium">Title</p>
               <div className="justify-self-stretch relative">
                  <input
                     className={`placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="title"
                     type="text"
                     name="title"
                  />
               </div>
            </label>

            <div className="grid gap-y-2 text-left">
               <span className="sr-only">Content</span>
               <label htmlFor="about" className="block text-base font-medium">
                  Content
               </label>

               <textarea
                  id="about"
                  name="about"
                  rows={7}
                  className="py-3 pl-4 pr-4 placeholder:text-clr-bg-faded block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-5"
               ></textarea>
            </div>

            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">Genre Tags</span>
               <p className="capitalize text-base font-medium">Genre Tags</p>
               <div className="justify-self-stretch relative">
                  <input
                     className={`placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="genre"
                     type="text"
                     name="genre"
                  />
               </div>
            </label>

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
      </FormContainer>
   );
};
export default WritePoemPage;
