import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const links = [
   { href: " ", label: "Profile" },
   { href: " ", label: "Poems" },
   { href: " ", label: "Collections" },
   { href: " ", label: "Sign out" },
];

const UserDropdown = () => {
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
                  {links.map((link) => (
                     /* Use the `active` state to conditionally style the active item. */
                     <Menu.Item key={link.label} as={Fragment}>
                        {({ active }) => (
                           <a
                              href={link.href}
                              className={`${
                                 active ? "bg-clr-primary text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                           >
                              {link.label}
                           </a>
                        )}
                     </Menu.Item>
                  ))}
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
   );
};

export default UserDropdown;
