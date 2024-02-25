import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useSignOutMutation } from "../../../slices/usersApiSlice.js";
import { removeSignInDetails } from "../../../slices/authSlice.js";

const UserDropdown = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { userAccInfo } = useSelector((state) => state.authUser);

   const [signOut] = useSignOutMutation();

   const logoutHandler = async () => {
      try {
         await signOut().unwrap();
         dispatch(removeSignInDetails());
         navigate("/signin");
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Menu as="div" className="relative inline-block text-left z-40">
         <div className="grid items-center">
            <Menu.Button className="inline-flex w-full justify-center rounded-md ">
               <UserIcon className="transition-all w-6 md:w-8 text-clr-black stroke-1 hover:text-clr-primary" />
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
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg border border-1 border-clr-black">
               <div className="p-2">
                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           to="/account-profile"
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-gray-900"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Profile ({userAccInfo.name.split(" ")[0]})
                        </Link>
                     )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           to="/users/:userId/poems"
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-gray-900"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Poems
                        </Link>
                     )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           to="/users/:userId/collections"
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-gray-900"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Collections
                        </Link>
                     )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           to="/account-profile/account/update"
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-gray-900"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Account Settings
                        </Link>
                     )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           to="/signout"
                           onClick={logoutHandler}
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-gray-900"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Sign out
                        </Link>
                     )}
                  </Menu.Item>
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
   );
};

export default UserDropdown;
