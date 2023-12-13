import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Divider from "../components/UI/Divider.tsx";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/UI/FormContainer.tsx";
import { useLoginMutation } from "../slices/usersApiSlice.ts";
import { setCredentials } from "../slices/authSlice.ts";
import { toast } from "react-toastify";
import { RootState } from "../store.tsx";

const SignInPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [login, { isLoading }] = useLoginMutation();

   const { userInfo } = useSelector((state: RootState) => state.auth);

   const { search } = useLocation();
   const searchParams = new URLSearchParams(search);
   const redirect = searchParams.get("redirect") || "/";

   useEffect(() => {
      if (userInfo) {
         navigate(redirect);
      }
   }, [userInfo, redirect, navigate]);

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         const res = await login({ email, password }).unwrap();
         dispatch(setCredentials({ ...res }));
         navigate(redirect);
      } catch (err) {
         toast.error(err?.data?.message || err.error);
      }
   };

   return (
      <FormContainer>
         <h2 className="text-lg md:text-2xl font-bold text-clr-black">Sign In</h2>
         <form className="grid gap-6" onSubmit={submitHandler}>
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
                     className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                     placeholder="email address"
                     type="email"
                     name="email address"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
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
                     className="placeholder:text-clr-bg-faded text-sm md:text-base py-3 md:py-3 pl-12 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                     placeholder="password"
                     type="password"
                     name="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
            </label>

            <button
               type="submit"
               disabled={isLoading}
               className="text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
            >
               Sign In
            </button>

            {isLoading && <h2>Loading...</h2>}
         </form>
         <Divider />
         <p className="text-clr-black-faded text-xs md:text-sm">
            Don't have an account?{" "}
            <Link
               to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
               className="text-clr-primary font-normal hover:underline"
            >
               Sign up
            </Link>
         </p>
      </FormContainer>
   );
};
export default SignInPage;
