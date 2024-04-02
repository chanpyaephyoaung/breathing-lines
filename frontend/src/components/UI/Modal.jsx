import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({
   isOpen,
   closeModal,
   desc,
   confirmBtnText,
   discardBtnText = "No",
   successFunc,
   children,
}) => {
   return (
      <>
         {/* Backdrop */}
         {isOpen && (
            <div className="fixed inset-0 bg-black/30 z-10 backdrop-blur-sm" aria-hidden="true" />
         )}

         <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={closeModal}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black/25" />
               </Transition.Child>

               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                     >
                        <Dialog.Panel className="text-center w-full max-w-md transform overflow-hidden rounded-2xl bg-clr-white border border-clr-black p-6 align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-base font-medium leading-6 text-clr-black"
                           >
                              {desc}
                           </Dialog.Title>

                           <div className="my-6">{children}</div>

                           <div className="mt-4">
                              <div className="flex justify-center gap-x-4">
                                 <button
                                    type="button"
                                    className="text-xs py-2 px-5 md:text-sm md:py-3 md:px-5 text-clr-black font-medium border border-clr-black rounded-lg hover:bg-clr-black hover:text-clr-white focus:outline-none focus:border-clr-black focus:ring-clr-black focus:ring-1 transition duration-300 leading-none"
                                    onClick={closeModal}
                                 >
                                    {discardBtnText}
                                 </button>
                                 <button
                                    type="button"
                                    className="text-xs py-2 px-5 md:text-sm md:py-3 md:px-5 text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                                    onClick={() => successFunc()}
                                 >
                                    {confirmBtnText}
                                 </button>
                              </div>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
};
export default Modal;
