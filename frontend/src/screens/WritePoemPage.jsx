import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import FormContainer from "../components/UI/FormContainer.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import {
   POEM_WRITE_STATUS_DISCARD,
   POEM_WRITE_STATUS_DRAFT,
   POEM_WRITE_STATUS_PUBLISH,
} from "../constants.js";
import { useWriteNewPoemMutation } from "../slices/poemsApiSlice.js";
import { toast } from "react-toastify";

const WritePoemPage = () => {
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [coverImg, setCoverImg] = useState("");
   const [genres, setGenres] = useState("");

   const [writeNewPoem, { isLoading: loadingWriteNewPoem }] = useWriteNewPoemMutation();

   const submitHandler = async (e, status) => {
      e.preventDefault();
      console.log(status);

      if (!title || !content || !genres) {
         toast.error("All fields are required!");
         return;
      } else {
         try {
            const newPoem = {
               title,
               content,
               coverImg: coverImg || "",
               genres: genres.split(","),
               status,
            };
            await writeNewPoem(newPoem).unwrap();
            toast.success(`Poem ${status.toLowerCase()}ed successfully!`);
         } catch (err) {
            toast(err?.data?.errMessage || err.error);
         }
      }
   };

   return (
      <FormContainer>
         <h2 className="text-lg md:text-2xl font-bold text-clr-black">Upload a Poem!</h2>

         <form onSubmit={(e) => e.preventDefault} className="grid gap-6">
            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">Title</span>
               <p className="text-base font-medium">Title</p>
               <div className="justify-self-stretch relative">
                  <input
                     className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="title"
                     type="text"
                     name="title"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
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
                  className="py-3 pl-4 pr-4 placeholder:text-clr-black-faded block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-5"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
               ></textarea>
            </div>

            <div>
               <label className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">cover image</span>
                  <div className="justify-self-stretch relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <PhotoIcon className="w-5 h-5 text-clr-black-faded" />
                     </span>

                     <input
                        className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-8 md:pl-12 pr-3 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                        placeholder="Enter cover image url"
                        type="text"
                        name="coverImg"
                     />
                  </div>
               </label>

               <div className="relative text-xs grid justify-items-start gap-y-2">
                  <span className="sr-only">cover image</span>
                  <div className="justify-self-stretch relative">
                     <input
                        className="block file:text-clr-white file:rounded file:border-0 file:py-3 file:px-6 file:mr-4 file:bg-clr-primary file:cursor-pointer text-clr-black-faded text-sm md:text-base pr-3 bg-clr-bg w-full border border-t-0 border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 cursor-pointer leading-none"
                        label="Choose file"
                        type="file"
                     />
                  </div>
               </div>
            </div>

            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">Genre Tags</span>
               <p className="capitalize text-base font-medium">Genre Tags</p>
               <div className="justify-self-stretch relative">
                  <input
                     className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="genre (e.g. love, nature)"
                     type="text"
                     name="genres"
                     value={genres}
                     onChange={(e) => setGenres(e.target.value)}
                  />
               </div>
            </label>

            <div className="w-full justify-center flex gap-x-4">
               <button
                  type="submit"
                  className="text-xs py-2 px-5 md:text-base md:py-3 md:px-5 text-clr-black font-medium border border-clr-black rounded-lg hover:bg-clr-black hover:text-clr-white focus:outline-none focus:border-clr-black focus:ring-clr-black focus:ring-1 transition duration-300 leading-none"
                  onClick={(e) => submitHandler(e, POEM_WRITE_STATUS_DISCARD)}
               >
                  Discard
               </button>

               <button
                  type="submit"
                  className="text-xs py-2 px-5 md:text-base md:py-3 md:px-5 text-clr-tertiary font-medium border border-clr-tertiary rounded-lg hover:bg-clr-tertiary hover:text-clr-white focus:outline-none focus:border-clr-tertiary focus:ring-clr-tertiary focus:ring-1 transition duration-300 leading-none"
                  onClick={(e) => submitHandler(e, POEM_WRITE_STATUS_DRAFT)}
               >
                  Draft
               </button>

               <button
                  type="submit"
                  className="text-xs py-2 px-5 md:text-base md:py-3 md:px-5 text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                  onClick={(e) => submitHandler(e, POEM_WRITE_STATUS_PUBLISH)}
               >
                  Publish
               </button>
            </div>

            {loadingWriteNewPoem && <LoaderSpinner />}
         </form>
      </FormContainer>
   );
};
export default WritePoemPage;
