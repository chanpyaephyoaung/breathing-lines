import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserIcon } from "@heroicons/react/24/outline";
import {
   useSubscribeUserMutation,
   useCreateNewNotificationMutation,
   useUpdateUnreadNotiCountMutation,
} from "../../slices/usersApiSlice.js";
import { toast } from "react-toastify";

const UserBox = ({
   id: targetUserId,
   name,
   img,
   onCloseModal,
   targetUserProfileDetails,
   currentUserProfileDetails,
   isFollowerBtnClicked,
   onRefetch,
   socket,
}) => {
   const { userAccInfo } = useSelector((state) => state.authUser);
   const [subscribeUser] = useSubscribeUserMutation();
   const [createNewNotification] = useCreateNewNotificationMutation();
   const [updateUnreadNotiCount] = useUpdateUnreadNotiCountMutation();

   // Create a notification
   const createNotification = async (currentUserId, targetUserId, notiMessage, notiType) => {
      await createNewNotification({
         userId: currentUserId,
         newNotiData: {
            createdBy: currentUserId,
            receivedBy: targetUserId,
            notificationMessage: notiMessage,
            notificationType: notiType,
            createdAt: new Date(),
         },
      });
      return await updateUnreadNotiCount({
         userId: targetUserId,
      }).unwrap();
   };

   const subscribeUserHandler = async () => {
      try {
         const res = await subscribeUser(targetUserId).unwrap();
         if (!targetUserProfileDetails?.targetUser?.followings.includes(targetUserId)) {
            const unreadNotiCountOfUser = await createNotification(
               userAccInfo?._id,
               targetUserId,
               `${userAccInfo?.name} started following you!`,
               "follow"
            );

            // Emitting socket event for following a user
            socket.emit("sendFollowUserNotification", {
               unreadNotiCount: unreadNotiCountOfUser,
               targetUserId: targetUserId,
            });
         }
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
            {img ? (
               <img
                  src={`data:image/jpeg;base64,${img}`}
                  alt="user profile"
                  className={`w-[35px] h-[35px] md:w-[45px] md:h-[45px] rounded-full border border-clr-black object-cover row-start-1`}
               />
            ) : (
               <div className="grid place-items-center w-9 h-10 md:w-10 md:h-10 text-xs rounded-full border-2 border-clr-black-faded">
                  <UserIcon className="w-8 h-8 md:w-8 md:h-8 text-xs rounded-full text-clr-black-faded" />
               </div>
            )}
            <div className="grid justify-items-start">
               <Link
                  onClick={closeModal}
                  to={`/user-profile/${targetUserId}`}
                  className="transition-all text-clr-black hover:text-clr-primary font-regular text-xs md:text-base cursor-pointer"
               >
                  {name}
               </Link>
            </div>
            {userAccInfo._id !== targetUserProfileDetails?.targetUser?._id &&
               userAccInfo._id !== targetUserId && (
                  <button
                     onClick={subscribeUserHandler}
                     type="type"
                     className="justify-self-end text-xs py-2 px-4 md:text-sm md:py-2 text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                  >
                     {isFollowerBtnClicked
                        ? targetUserProfileDetails?.targetUser?.followers.includes(targetUserId)
                           ? " Unfollow"
                           : "Follow"
                        : targetUserProfileDetails?.targetUser?.followings.includes(targetUserId)
                        ? "Unfollow"
                        : "Follow"}
                  </button>
               )}
            {userAccInfo._id === targetUserProfileDetails?.targetUser?._id && (
               <button
                  onClick={subscribeUserHandler}
                  type="type"
                  className="justify-self-end text-xs py-2 px-4 md:text-sm md:py-2 text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
               >
                  {isFollowerBtnClicked
                     ? currentUserProfileDetails?.targetUser?.followers.includes(targetUserId)
                        ? " Unfollow"
                        : "Follow"
                     : currentUserProfileDetails?.targetUser?.followings.includes(targetUserId)
                     ? " Unfollow"
                     : "Follow"}
               </button>
            )}
         </div>
      </div>
   );
};
export default UserBox;
