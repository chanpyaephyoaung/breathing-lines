import { UserCircleIcon } from "@heroicons/react/24/outline";
import FormContainer from "../components/UI/FormContainer.jsx";

const UserProfileUpdatePage = () => {
   const submitHandler = () => {};

   return (
      <FormContainer>
         <h2 className="text-lg md:text-2xl font-bold text-clr-black">Update Profile</h2>
         <form className="grid gap-6" onSubmit={submitHandler}>
            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">username</span>
               <div className="justify-self-stretch relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                     <UserCircleIcon className="w-5 h-5 text-clr-black-faded" />
                  </span>

                  <input
                     className={`placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-8 md:pl-12 pr-3 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="Username"
                     type="text"
                     name="username"
                  />
               </div>
            </label>

            <div className="grid gap-y-2 text-left">
               <span className="sr-only">description</span>
               <label htmlFor="about" className="block text-clr-black-faded text-base pl-2">
                  Add your description
               </label>

               <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="py-3 pl-4 pr-4 placeholder:text-clr-bg-faded block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-5"
               ></textarea>
            </div>

            <button
               type="submit"
               className="text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
            >
               Update
            </button>
         </form>
      </FormContainer>
   );
};
export default UserProfileUpdatePage;
