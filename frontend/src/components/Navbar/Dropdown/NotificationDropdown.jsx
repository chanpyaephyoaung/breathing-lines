import { useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useGetNotificationsOfUserQuery } from "../../../slices/usersApiSlice";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

// const dummyData = [
//    {
//       id: 1,
//       otherUser: "Rose",
//       userProfileImg:
//          "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       action: "liked",
//       targetPoem: "Whispers of the wind",
//       time: "1 hr ago",
//    },
//    {
//       id: 2,
//       otherUser: "Rose",
//       userProfileImg:
//          "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       action: "commented",
//       targetPoem: "Whispers of the wind",
//       time: "1 hr ago",
//    },
//    {
//       id: 3,
//       otherUser: "Rose",
//       userProfileImg:
//          "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       action: "liked",
//       targetPoem: "Whispers of another wind",
//       time: "1 day ago",
//    },
// ];

const NotificationDropdown = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);

   const { data: notifications } = useGetNotificationsOfUserQuery(userAccInfo?._id);
   console.log(notifications);

   return (
      <Menu as="div" className="relative inline-block text-left z-40">
         <div className="grid items-center">
            <Menu.Button className="inline-flex w-full justify-center rounded-md ">
               <BellIcon className="transition-all w-6 md:w-8 text-clr-black hover:text-clr-primary stroke-1" />
            </Menu.Button>
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
                                 <img
                                    src={data.encodedProfileImg}
                                    className="rounded-full w-9 h-10 md:w-10 md:h-10 object-cover row-span-2 self-start"
                                    alt=""
                                 />
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
