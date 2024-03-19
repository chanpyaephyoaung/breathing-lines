import {
   HeartIcon,
   ChatBubbleBottomCenterTextIcon,
   PlusIcon,
   StarIcon,
} from "@heroicons/react/24/outline";

const PoemPostInteractionBar = () => {
   return (
      <>
         <div className="w-full py-3 px-6 border-t border-t-clr-black-faded flex justify-between">
            <div className="flex gap-x-4">
               <HeartIcon className="w-7 md:w-8 text-clr-black stroke-[0.8] cursor-pointer hover:stroke-clr-primary" />
               <ChatBubbleBottomCenterTextIcon className="w-7 md:w-8 text-clr-black stroke-[0.8] cursor-pointer hover:stroke-clr-primary" />
            </div>

            <div className="flex gap-x-4">
               <PlusIcon className="w-7 md:w-8 text-clr-black stroke-[0.8] cursor-pointer hover:stroke-clr-primary" />
               <StarIcon className="w-7 md:w-8 text-clr-black stroke-[0.8] cursor-pointer hover:stroke-clr-primary" />
            </div>
         </div>
      </>
   );
};
export default PoemPostInteractionBar;
