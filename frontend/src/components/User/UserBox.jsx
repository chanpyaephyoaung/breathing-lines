import { Link } from "react-router-dom";
import { useSubscribeUserMutation } from "../../slices/usersApiSlice.js";
import { toast } from "react-toastify";

const UserBox = ({
   id,
   name,
   img,
   onCloseModal,
   userProfileDetails,
   isFollowerBtnClicked,
   onRefetch,
}) => {
   const [subscribeUser] = useSubscribeUserMutation();
   const subscribeUserHandler = async () => {
      try {
         const res = await subscribeUser(id).unwrap();
         onRefetch();
         toast(res.message);
      } catch (err) {
         toast(err?.data?.errMessage || err.error);
      }
   };

   const closeModal = () => {
      onCloseModal();
   };
   return (
      <div className="w-full grid justify-items-center">
         <div
            className={`w-5/6
             grid grid-cols-[35px_1fr_1fr] md:grid-cols-[45px_1fr_1fr] items-center gap-x-6 gap-y-6 pb-2`}
         >
            <img
               src={`data:image/jpeg;base64,${
                  img ||
                  "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"
               }`}
               alt="user profile"
               className={`w-[35px] h-[35px] md:w-[45px] md:h-[45px] rounded-full border border-clr-black object-cover row-start-1`}
            />
            <div className="grid justify-items-start">
               <Link
                  onClick={closeModal}
                  to={`/user-profile/${id}`}
                  className="transition-all text-clr-black hover:text-clr-primary font-regular text-xs md:text-base cursor-pointer"
               >
                  {name}
               </Link>
            </div>
            <button
               onClick={subscribeUserHandler}
               type="type"
               className="justify-self-end text-xs py-2 px-4 md:text-sm md:py-2 text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
            >
               {isFollowerBtnClicked
                  ? userProfileDetails?.targetUser?.followings.includes(id)
                     ? " Unfollow"
                     : "Follow"
                  : userProfileDetails?.targetUser?.followers.includes(id)
                  ? " Unfollow"
                  : "Follow"}
            </button>
         </div>
      </div>
   );
};
export default UserBox;