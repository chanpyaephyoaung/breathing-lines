import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const PoemFilterDropDown = ({ onChangeFilterOption }) => {
   const filterOptionHandler = (option) => {
      onChangeFilterOption(option);
   };
   const { userAccInfo } = useSelector((state) => state.authUser);

   return (
      <Menu as="div" className="relative inline-block text-left">
         <div className="grid items-center">
            <Menu.Button className="inline-flex w-full justify-center rounded-md ">
               <AdjustmentsHorizontalIcon className="transition-all w-6 text-clr-black stroke-1 hover:text-clr-primary" />
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
            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg border border-1 border-clr-black">
               <div className="p-2">
                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           onClick={() => filterOptionHandler("title")}
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-gray-900"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Name
                        </Link>
                     )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           onClick={() => filterOptionHandler("publishedAt")}
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-gray-900"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Date
                        </Link>
                     )}
                  </Menu.Item>

                  <Menu.Item as={Fragment}>
                     {({ active }) => (
                        <Link
                           onClick={() => filterOptionHandler("likesCount")}
                           className={`${
                              active ? "bg-clr-primary text-white" : "text-gray-900"
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           Likes Count
                        </Link>
                     )}
                  </Menu.Item>
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
   );
};

export default PoemFilterDropDown;
