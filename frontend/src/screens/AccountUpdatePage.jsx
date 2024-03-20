import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EnvelopeIcon, LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import FormContainer from "../components/UI/FormContainer.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import { setSignInDetails } from "../slices/authSlice.js";
import { useUpdateAccDetailsMutation } from "../slices/usersApiSlice.js";
import Message from "../components/Typography/Message.jsx";

const AccountUpdatePage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { userAccInfo } = useSelector((state) => state.authUser);

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState(null);

   const [updateAccDetails, { isLoading }] = useUpdateAccDetailsMutation();

   const submitHandler = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         setError("Passwords do not match. Please try again.");
      } else {
         try {
            const res = await updateAccDetails({
               email,
               password,
            }).unwrap();
            dispatch(setSignInDetails({ ...res }));
            navigate(`/user-profile/${userAccInfo._id}`);
         } catch (err) {
            setError(err?.data?.errMessage || err.error);
         }
      }
   };

   return (
      <FormContainer>
         <h2 className="text-lg md:text-2xl font-bold text-clr-black">Update Account</h2>
         <form className="grid gap-6" onSubmit={submitHandler}>
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
                     placeholder="Confirm Password"
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
            >
               Update Account
            </button>

            {/* Loader */}
            {isLoading && <LoaderSpinner />}

            {/* Error Display */}
            {error && <Message type="danger">{error}</Message>}
         </form>
      </FormContainer>
   );
};
export default AccountUpdatePage;
