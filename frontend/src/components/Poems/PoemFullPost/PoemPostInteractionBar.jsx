import {
   HeartIcon,
   ChatBubbleBottomCenterTextIcon,
   ArrowUturnRightIcon,
   PlusIcon,
   StarIcon,
} from "@heroicons/react/24/outline";

const PoemPostInteractionBar = () => {
   return (
      <>
         <div className="py-3 px-6 border border-1 border-t-clr-black flex justify-between">
            <div className="flex gap-x-4">
               <HeartIcon className="w-7 md:w-8 text-clr-black stroke-[0.8] cursor-pointer hover:stroke-clr-primary" />
               <ChatBubbleBottomCenterTextIcon className="w-7 md:w-8 text-clr-black stroke-[0.8] cursor-pointer hover:stroke-clr-primary" />
               <ArrowUturnRightIcon className="w-7 md:w-8 text-clr-black stroke-[0.8] cursor-pointer hover:stroke-clr-primary" />
            </div>

            <div className="flex gap-x-4">
               <PlusIcon className="w-7 md:w-8 text-clr-black stroke-[0.8] cursor-pointer hover:stroke-clr-primary" />
               <StarIcon className="w-7 md:w-8 text-clr-black stroke-[0.8] cursor-pointer hover:stroke-clr-primary" />
            </div>
         </div>

         <div className="text-xs md:text-sm py-3 px-6 border border-1 border-t-clr-black flex justify-between">
            <div className="grid gap-y-1 items-center justify-items-start">
               <p>200 likes</p>
               <p className="hover:underline hover:text-clr-primary cursor-pointer">
                  View all 5 comments
               </p>
            </div>

            <div className="grid gap-y-1  items-center justify-items-end">
               <p>13 shares</p>
               <div className="flex gap-x-1">
                  <div className="flex">
                     <StarIcon className="w-4 md:w-5 fill-clr-secondary" />
                     <StarIcon className="w-4 md:w-5 fill-clr-secondary" />
                     <StarIcon className="w-4 md:w-5 fill-clr-secondary" />
                     <StarIcon className="w-4 md:w-5 fill-clr-secondary" />
                     <StarIcon className="w-4 md:w-5" />
                  </div>
                  <span>(14)</span>
               </div>
            </div>
         </div>
      </>
   );
};
export default PoemPostInteractionBar;
