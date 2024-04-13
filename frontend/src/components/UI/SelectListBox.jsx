import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { bgThemes } from "../../constants.js";

const SelectListBox = ({ selectedBgTheme, onChangeSelectedBgTheme }) => {
   const selectedBgThemeHandler = (selectedBgTheme) => {
      onChangeSelectedBgTheme(selectedBgTheme);
   };

   return (
      <div className="relative w-72">
         <Listbox value={selectedBgTheme} onChange={selectedBgThemeHandler}>
            <div className="relative z-[1] mt-1">
               <Listbox.Button className="relative w-full text-left text-sm md:text-base py-3 pl-4 md:py-3 pr-3 text-clr-black-faded rounded-lg bg-clr-bg border border-clr-black-faded  focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none">
                  <span className="block truncate">{selectedBgTheme.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                     <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
               </Listbox.Button>
               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <Listbox.Options className="absolute mt-1 text-sm md:text-base max-h-60 border border-clr-black-faded w-full overflow-auto rounded-md bg-clr-bg py-1 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                     {bgThemes.map((bgTheme) => (
                        <Listbox.Option
                           key={bgTheme.id}
                           className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                 active
                                    ? "bg-clr-primary text-clr-white"
                                    : "bg-clr-bg text-clr-black-faded"
                              }`
                           }
                           value={bgTheme}
                        >
                           {({ selected }) => (
                              <div className="flex gap-x-2 items-center">
                                 {bgTheme.path !== "" && (
                                    <img
                                       src={bgTheme.path}
                                       alt="pattern"
                                       className="w-8 h-8 object-cover border border-clr-black-faded rounded-lg"
                                    />
                                 )}
                                 <span
                                    className={`block truncate ${
                                       selected ? "font-medium" : "font-normal"
                                    }`}
                                 >
                                    {bgTheme.name}
                                 </span>
                                 {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                       <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                 ) : null}
                              </div>
                           )}
                        </Listbox.Option>
                     ))}
                  </Listbox.Options>
               </Transition>
            </div>
         </Listbox>
      </div>
   );
};

export default SelectListBox;
