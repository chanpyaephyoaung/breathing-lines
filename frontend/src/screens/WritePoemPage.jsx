import FormContainer from "../components/UI/FormContainer.jsx";

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
                     className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
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
                  className="py-3 pl-4 pr-4 placeholder:text-clr-black-faded block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-5"
               ></textarea>
            </div>

            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">Genre Tags</span>
               <p className="capitalize text-base font-medium">Genre Tags</p>
               <div className="justify-self-stretch relative">
                  <input
                     className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="genre"
                     type="text"
                     name="genre"
                  />
               </div>
            </label>

            <div className="w-full justify-center flex gap-x-4">
               <button
                  type="submit"
                  className="text-xs py-2 px-5 md:text-base md:py-3 md:px-5 text-clr-black font-medium border border-clr-black rounded-lg hover:bg-clr-black hover:text-clr-white focus:outline-none focus:border-clr-black focus:ring-clr-black focus:ring-1 transition duration-300 leading-none"
               >
                  Discard
               </button>

               <button
                  type="submit"
                  className="text-xs py-2 px-5 md:text-base md:py-3 md:px-5 text-clr-tertiary font-medium border border-clr-tertiary rounded-lg hover:bg-clr-tertiary hover:text-clr-white focus:outline-none focus:border-clr-tertiary focus:ring-clr-tertiary focus:ring-1 transition duration-300 leading-none"
               >
                  Draft
               </button>

               <button
                  type="submit"
                  className="text-xs py-2 px-5 md:text-base md:py-3 md:px-5 text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
               >
                  Publish
               </button>
            </div>
         </form>
      </FormContainer>
   );
};
export default WritePoemPage;
