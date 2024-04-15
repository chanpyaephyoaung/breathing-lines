import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const UserPoemFeedsDropdown = () => {
   const [navText, setNavText] = useState("Home");

   return (
      <Menu as="div" className="relative inline-block text-left">
         <div className="grid items-center">
            <Menu.Button className="transition-all flex gap-x-1 items-center w-full justify-center rounded-md text-clr-black hover:text-clr-primary">
               {navText} <ChevronDownIcon className="w-4 stroke-1" />
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
            <Menu.Items className="absolute left-0 mt-2 w-40 origin-top-left rounded-md bg-white shadow-lg border border-1 border-clr-black">
               <div className="p-2">
                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           to={"/"}
                           onClick={() => setNavText("Home")}
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-gray-900"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Home
                        </Link>
                     )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           to={"/poems/for-you"}
                           onClick={() => setNavText("For You")}
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-gray-900"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           For You
                        </Link>
                     )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           to={"/poems/followings"}
                           onClick={() => setNavText("Followings")}
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-gray-900"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Followings
                        </Link>
                     )}
                  </Menu.Item>
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
   );
};

export default UserPoemFeedsDropdown;
