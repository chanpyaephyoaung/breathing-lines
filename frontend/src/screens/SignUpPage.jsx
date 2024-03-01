import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Divider from "../components/UI/Divider.jsx";
import FormContainer from "../components/UI/FormContainer.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import {
   EnvelopeIcon,
   LockClosedIcon,
   CheckCircleIcon,
   UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useSignUpMutation } from "../slices/usersApiSlice.js";
import { setSignInDetails } from "../slices/authSlice.js";
import { toast } from "react-toastify";

const SignUpPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const { userAccInfo } = useSelector((state) => state.authUser);

   // Retrieve the redirect path if there is one
   const { search } = useLocation();
   const searchParams = new URLSearchParams(search);
   const redirectPath = searchParams.get("redirect") || "/";

   const [signUp, { isLoading }] = useSignUpMutation();

   useEffect(() => {
      if (userAccInfo) {
         navigate(redirectPath);
      }
   }, [redirectPath, userAccInfo, navigate]);

   const submitHandler = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
         toast.error("Passwords do not match.");
         return;
      } else {
         try {
            const res = await signUp({ name, email, password }).unwrap();
            dispatch(setSignInDetails({ ...res }));
            navigate(redirectPath);
         } catch (err) {
            toast.error(err?.data?.errMessage || err.error);
         }
      }
   };

   return (
      <FormContainer>
         <h2 className="text-lg md:text-2xl font-medium text-clr-black">Sign Up</h2>
         <form onSubmit={submitHandler} className="grid gap-6">
            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">name</span>
               <div className="justify-self-stretch relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                     <UserCircleIcon className="w-5 h-5 text-clr-black-faded" />
                  </span>

                  <input
                     className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-8 md:pl-12 pr-3 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="name"
                     type="text"
                     name="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>
            </label>

            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">email address</span>
               <div className="justify-self-stretch relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                     <EnvelopeIcon className="w-5 h-5 text-clr-black-faded" />
                  </span>

                  <input
                     className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-8 md:pl-12 pr-3 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
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
                     <LockClosedIcon className="w-5 h-5 text-clr-black-faded" />
                  </span>

                  <input
                     className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-8 md:pl-12 pr-3 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="password"
                     type="password"
                     name="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
            </label>

            <label className="relative text-xs grid justify-items-start gap-y-2">
               <span className="sr-only">confirm password</span>
               <div className="justify-self-stretch relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                     <CheckCircleIcon className="w-5 h-5 text-clr-black-faded" />
                  </span>

                  <input
                     className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-8 md:pl-12 pr-3 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                     placeholder="confirm password"
                     type="password"
                     name="confirmPassword"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                  />
               </div>
            </label>

            <button
               type="submit"
               className="text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
               disabled={isLoading}
            >
               Sign Up
            </button>

            {isLoading && <LoaderSpinner />}
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
