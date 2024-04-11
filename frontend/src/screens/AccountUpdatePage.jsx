import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EnvelopeIcon, LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import FormContainer from "../components/UI/FormContainer.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import { setSignInDetails, removeSignInDetails } from "../slices/authSlice.js";
import { useUpdateAccDetailsMutation, useDeleteUserAccMutation } from "../slices/usersApiSlice.js";
import Message from "../components/Typography/Message.jsx";
import Modal from "../components/UI/Modal.jsx";
import { toast } from "react-toastify";

const AccountUpdatePage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { userAccInfo } = useSelector((state) => state.authUser);

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState(null);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [ctaType, setCtaType] = useState("");
   const [modalDesc, setModalDesc] = useState("");

   const [updateAccDetails, { isLoading: loadingUpdateAccDetails }] = useUpdateAccDetailsMutation();
   const [deleteUserAcc, { isLoading: loadingDeleteUserAcc }] = useDeleteUserAccMutation();

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const openModal = () => {
      setIsModalOpen(true);
   };

   const updateAccHandler = () => {
      setCtaType("update");
      setModalDesc("Do you really wish to update the changes?");
      openModal();
   };

   const deleteAccHandler = () => {
      setCtaType("delete");
      setModalDesc(
         "Do you really wish to delete your account? This is permanent and cannot be undone."
      );
      openModal();
   };

   const ctaHandler = async () => {
      try {
         if (ctaType === "update") {
            if (password !== confirmPassword) {
               setError("Passwords do not match. Please try again.");
            } else {
               const res = await updateAccDetails({
                  email,
                  password,
               }).unwrap();
               dispatch(setSignInDetails({ ...res }));
               toast.success("Poem updated successfully!");
               closeModal();
            }
         } else if (ctaType === "delete") {
            await deleteUserAcc(userAccInfo?._id).unwrap();
            dispatch(removeSignInDetails({}));
            toast.success("Account deleted successfully!");
            navigate("/");
         }
      } catch (err) {
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   return (
      <>
         <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
            desc={modalDesc}
            confirmBtnText="Confirm"
            successFunc={ctaHandler}
         />
         <FormContainer>
            <h2 className="text-lg md:text-2xl font-bold text-clr-black">Update Account</h2>
            <form className="grid gap-6">
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
                  type="button"
                  onClick={updateAccHandler}
                  className="text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
               >
                  Update Account
               </button>

               {/* Loader */}
               {(loadingUpdateAccDetails || loadingDeleteUserAcc) && <LoaderSpinner />}

               {/* Error Display */}
               {error && <Message type="danger">{error}</Message>}
            </form>
         </FormContainer>
         <FormContainer>
            <h2 className="text-lg md:text-2xl font-bold text-clr-black">Delete Account</h2>
            <form className="grid gap-6">
               <button
                  type="button"
                  onClick={deleteAccHandler}
                  className="text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
               >
                  Delete Account
               </button>
            </form>
         </FormContainer>
      </>
   );
};
export default AccountUpdatePage;
