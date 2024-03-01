import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon, PhotoIcon } from "@heroicons/react/24/outline";
import FormContainer from "../components/UI/FormContainer.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import Message from "../components/Typography/Message.jsx";
import {
   useUploadUserProfileImageMutation,
   useUpdateUserProfileMutation,
   useGetUserProfileQuery,
} from "../slices/usersApiSlice.js";
import { setSignInDetails } from "../slices/authSlice.js";
import { toast } from "react-toastify";

const UserProfileUpdatePage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { userAccInfo } = useSelector((state) => state.authUser);

   const [username, setUsername] = useState("");
   const [profileImg, setProfileImg] = useState("");
   const [profileDesc, setProfileDesc] = useState("");

   const {
      data: userProfileDetails,
      error: loadingFetchingUserProfileError,
      isLoading: loadingFetchingUserProfile,
      refetch,
   } = useGetUserProfileQuery();
   console.log(userProfileDetails);

   const [uploadUserProfileImage, { isLoading: loadingUserProfileUpload }] =
      useUploadUserProfileImageMutation();

   const [updateUserProfile, { isLoading: loadingUpdateUserProfile }] =
      useUpdateUserProfileMutation();

   useEffect(() => {
      if (userProfileDetails) {
         setUsername(userProfileDetails?.currentUser?.name);

         if (userProfileDetails?.currentUser?.profileDesc) {
            setProfileDesc(userProfileDetails?.currentUser?.profileDesc);
         }

         if (userProfileDetails?.currentUser?.profileImg) {
            setProfileImg(userProfileDetails?.currentUser?.profileImg.split("uploads/")[1]);
         }
      }
   }, [userProfileDetails]);

   const submitHandler = async (e) => {
      e.preventDefault();

      try {
         await updateUserProfile({
            name: username,
            profileDesc,
            profileImg,
         }).unwrap();
         navigate("/account-profile");
         dispatch(setSignInDetails({ ...userAccInfo, name: username }));
         refetch();
      } catch (err) {
         toast(err?.data?.errMessage || err.error);
      }
   };

   const uploadFileHandler = async (e) => {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      try {
         const res = await uploadUserProfileImage(formData).unwrap();
         toast.success(res.message);
         setProfileImg(res.result.fileKey);
      } catch (err) {
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   return (
      <FormContainer>
         {loadingFetchingUserProfile ? (
            <LoaderSpinner />
         ) : loadingFetchingUserProfileError ? (
            <Message type="danger">
               {loadingFetchingUserProfileError?.data?.message ||
                  loadingFetchingUserProfileError.error}
            </Message>
         ) : (
            <>
               <h2 className="text-lg md:text-2xl font-bold text-clr-black">Update Profile</h2>
               <form className="grid gap-6" onSubmit={submitHandler}>
                  <label className="relative text-xs grid justify-items-start gap-y-2">
                     <span className="sr-only">username</span>
                     <div className="justify-self-stretch relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                           <UserCircleIcon className="w-5 h-5 text-clr-black-faded" />
                        </span>

                        <input
                           className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-8 md:pl-12 pr-3 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                           placeholder="Username"
                           type="text"
                           name="username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                        />
                     </div>
                  </label>

                  <div>
                     <label className="relative text-xs grid justify-items-start gap-y-2">
                        <span className="sr-only">profile picture</span>
                        <div className="justify-self-stretch relative">
                           <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                              <PhotoIcon className="w-5 h-5 text-clr-black-faded" />
                           </span>

                           <input
                              className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-8 md:pl-12 pr-3 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                              placeholder="Enter profile image url"
                              type="text"
                              name="profilePicture"
                              value={profileImg}
                              onChange={(e) => setProfileImg(e.target.value)}
                           />
                        </div>
                     </label>

                     <div className="relative text-xs grid justify-items-start gap-y-2">
                        <span className="sr-only">profile picture</span>
                        <div className="justify-self-stretch relative">
                           <input
                              className="block file:text-clr-white file:rounded file:border-0 file:py-3 file:px-6 file:mr-4 file:bg-clr-primary file:cursor-pointer text-clr-black-faded text-sm md:text-base pr-3 bg-clr-bg w-full border border-t-0 border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 cursor-pointer leading-none"
                              label="Choose file"
                              type="file"
                              onChange={uploadFileHandler}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="grid gap-y-2 text-left">
                     <span className="sr-only">description</span>
                     <label htmlFor="about" className="block text-clr-black-faded text-base pl-2">
                        Add your description
                     </label>

                     <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="py-3 pl-4 pr-4 placeholder:text-clr-black-faded block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-5"
                        value={profileDesc}
                        onChange={(e) => setProfileDesc(e.target.value)}
                     ></textarea>
                  </div>

                  <button
                     type="submit"
                     className="text-sm py-3 px-5 md:text-base text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                  >
                     Update
                  </button>

                  {loadingUserProfileUpload && <LoaderSpinner />}
                  {loadingUpdateUserProfile && <LoaderSpinner />}
               </form>
            </>
         )}
      </FormContainer>
   );
};
export default UserProfileUpdatePage;
