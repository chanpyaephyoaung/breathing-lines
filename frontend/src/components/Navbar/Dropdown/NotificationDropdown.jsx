import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BellIcon, UserIcon } from "@heroicons/react/24/outline";
import {
   useGetNotificationsOfUserQuery,
   useGetUnreadNotiCountQuery,
   useUpdateUnreadNotiCountMutation,
} from "../../../slices/usersApiSlice";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

let firstLoaded = false;

const NotificationDropdown = ({ socket }) => {
   const [unreadNotiCountState, setUnreadNotiCountState] = useState(0);
   const { userAccInfo } = useSelector((state) => state.authUser);
   const [updateUnreadNotiCount] = useUpdateUnreadNotiCountMutation();

   const { data: notifications, refetch: refetchGetNotis } = useGetNotificationsOfUserQuery(
      userAccInfo?._id
   );
   console.log(notifications);
   const { data: fetchedUnreadNotiCount, refetch: refetchUnreadNotiCount } =
      useGetUnreadNotiCountQuery(userAccInfo?._id);

   const notiIconHandler = async () => {
      refetchGetNotis();
      await updateUnreadNotiCount({
         userId: userAccInfo._id,
         defaultCount: 0,
      }).unwrap();
      setUnreadNotiCountState(0);
   };

   useEffect(() => {
      refetchUnreadNotiCount();
      if (fetchedUnreadNotiCount) {
         setUnreadNotiCountState(fetchedUnreadNotiCount);
      }
   }, [fetchedUnreadNotiCount, refetchUnreadNotiCount]);

   useEffect(() => {
      if (!firstLoaded) {
         firstLoaded = true;
         socket.on("getLikePoemNotification", ({ unreadNotiCount }) => {
            setUnreadNotiCountState(unreadNotiCount);
         });

         socket.on("getRatePoemNotification", ({ unreadNotiCount }) => {
            setUnreadNotiCountState(unreadNotiCount);
         });

         socket.on("getReviewPoemNotification", ({ unreadNotiCount }) => {
            setUnreadNotiCountState(unreadNotiCount);
         });

         socket.on("getFollowUserNotification", ({ unreadNotiCount }) => {
            setUnreadNotiCountState(unreadNotiCount);
         });

         socket.on("getProfileReviewNotification", ({ unreadNotiCount }) => {
            setUnreadNotiCountState(unreadNotiCount);
         });
      }
   }, [socket]);

   return (
      <Menu as="div" className="relative inline-block text-left z-40">
         <div onClick={notiIconHandler} className="grid items-center relative">
            <Menu.Button className="inline-flex w-full justify-center rounded-md ">
               <BellIcon className="transition-all w-6 md:w-8 text-clr-black hover:text-clr-primary stroke-1" />
            </Menu.Button>
            {(unreadNotiCountState || unreadNotiCountState !== 0) && (
               <span className="absolute -top-2 -right-2 w-6 h-6 grid place-items-center text-sm text-clr-white bg-clr-primary rounded-full">
                  {unreadNotiCountState}
               </span>
            )}
         </div>
         <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
         >
            <Menu.Items className="absolute right-0 mt-2 w-60 md:w-80 origin-top-right rounded-md bg-white shadow-lg border border-1 border-clr-black">
               <div className="p-2">
                  {notifications?.length === 0 && (
                     <p className="text-clr-primary text-xs md:text-sm text-center font-normal line-clamp-2 py-2">
                        No notifications yet!
                     </p>
                  )}
                  {notifications
                     ?.map((data) => (
                        /* Use the `active` state to conditionally style the active item. */
                        <Menu.Item key={data.id} as={Fragment}>
                           {({ active }) => (
                              <a
                                 href=" "
                                 className={`${
                                    active ? "bg-clr-primary text-clr-white" : "text-clr-black"
                                 } group grid gap-x-2 grid-cols-[1fr_5fr] grid-rows-[2fr_1fr] w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                 {data?.encodedProfileImg ? (
                                    <img
                                       src={`data:image/jpeg;base64,${data?.encodedProfileImg}`}
                                       className="rounded-full w-10 h-10 md:w-10 md:h-10 object-cover row-span-2 self-start"
                                       alt={`data?.createdBy?.name profile image`}
                                    />
                                 ) : (
                                    <div className="grid place-items-center w-9 h-10 md:w-10 md:h-10 text-xs rounded-full border-2 border-clr-black-faded">
                                       <UserIcon className="w-8 h-8 md:w-8 md:h-8 text-xs rounded-full text-clr-black-faded" />
                                    </div>
                                 )}

                                 <p className="col-start-2 text-xs md:text-sm font-normal line-clamp-2">
                                    {data.notificationMessage}
                                 </p>
                                 <span
                                    className={`col-start-2 row-start-2 text-2xs md:text-xs ${
                                       active ? "text-clr-white" : "text-clr-black-faded"
                                    }`}
                                 >
                                    {timeAgo.format(new Date(data.createdAt))}
                                 </span>
                              </a>
                           )}
                        </Menu.Item>
                     ))
                     .slice(0, 5)}
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
   );
};

export default NotificationDropdown;
