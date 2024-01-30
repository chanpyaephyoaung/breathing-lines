import { Link } from "react-router-dom";
import Divider from "../components/UI/Divider.jsx";
import FormContainer from "../components/UI/FormContainer.jsx";

const SignUpPage = () => {
   return (
      <FormContainer>
         <h2 className="text-lg md:text-2xl font-medium text-clr-black">Sign Up</h2>
         <form className="grid gap-6">
            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">username</span>
               <div className="justify-self-stretch relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-clr-black-faded"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                     </svg>
                  </span>

                  <input
                     className={`placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="username"
                     type="text"
                     name="username"
                  />
               </div>
            </label>
            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">email address</span>
               <div className="justify-self-stretch relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-clr-black-faded"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                     </svg>
                  </span>

                  <input
                     className={`placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="email address"
                     type="email"
                     name="email address"
                  />
               </div>
            </label>
            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">password</span>
               <div className="justify-self-stretch relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-clr-black-faded"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                     </svg>
                  </span>

                  <input
                     className={`placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="password"
                     type="password"
                     name="password"
                  />
               </div>
            </label>
            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">confirm password</span>
               <div className="justify-self-stretch relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-clr-black-faded"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                     </svg>
                  </span>

                  <input
                     className={`placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="confirm password"
                     type="password"
                     name="confirm password"
                  />
               </div>
            </label>

            <button
               type="submit"
               className="text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
            >
               Sign Up
            </button>
         </form>
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
export default SignUpPage;
