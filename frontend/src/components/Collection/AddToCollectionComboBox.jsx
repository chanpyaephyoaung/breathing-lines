import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const AddToCollectionComboBox = ({ collections, onChangeSelectedCollection }) => {
   const [selected, setSelected] = useState(collections[0]);
   const [query, setQuery] = useState("");

   const selectedCollectionChangeHandler = (selectedCollection) => {
      setSelected(selectedCollection);
      onChangeSelectedCollection(selectedCollection);
   };

   const filteredCollections =
      query === ""
         ? collections
         : collections.filter((collection) =>
              collection.name
                 .toLowerCase()
                 .replace(/\s+/g, "")
                 .includes(query.toLowerCase().replace(/\s+/g, ""))
           );

   return (
      <div className="">
         <Combobox value={selected} onChange={selectedCollectionChangeHandler}>
            <div className="relative mt-1">
               <div className="relative w-full cursor-default overflow-hidden rounded-lg border-2 border-clr-primary bg-clr-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-clr-primary focus-visible:ring-offset-2 focus-visible:ring-offset-clr-primary sm:text-sm">
                  <Combobox.Input
                     className="w-full border-none py-4 pl-3 pr-10 text-sm overflow-hidden bg-clr-white border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none"
                     displayValue={(collection) => collection.name}
                     onChange={(event) => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                     <ChevronUpDownIcon
                        className="h-5 w-5 text-clr-black-faded"
                        aria-hidden="true"
                     />
                  </Combobox.Button>
               </div>
               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
               >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-clr-primary focus:outline-none sm:text-sm">
                     {filteredCollections.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                           Nothing found.
                        </div>
                     ) : (
                        filteredCollections.map((collection) => (
                           <Combobox.Option
                              key={collection.id}
                              className={({ active }) =>
                                 `relative cursor-default select-none py-2 pl-6 pr-4 ${
                                    active ? "bg-clr-primary text-white" : "text-gray-900"
                                 }`
                              }
                              value={collection}
                           >
                              {({ selected, active }) => (
                                 <>
                                    <span
                                       className={`block truncate ${
                                          selected ? "font-medium" : "font-normal"
                                       }`}
                                    >
                                       {collection.name}
                                    </span>
                                    {selected ? (
                                       <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                             active ? "text-white" : "text-teal-600"
                                          }`}
                                       >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                       </span>
                                    ) : null}
                                 </>
                              )}
                           </Combobox.Option>
                        ))
                     )}
                  </Combobox.Options>
               </Transition>
            </div>
         </Combobox>
      </div>
   );
};

export default AddToCollectionComboBox;
