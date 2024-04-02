import { useState } from "react";
import { Switch } from "@headlessui/react";

const ToggleSwitch = ({ enabled, label }) => {
   return (
      <div className="flex items-center gap-x-2">
         <span className="text-sm md:text-base text-clr-black font-medium">{label}</span>
         <Switch
            checked={enabled}
            className={`${
               enabled ? "bg-clr-primary" : "bg-clr-black-faded"
            } relative inline-flex h-8 w-14 items-center rounded-full`}
         >
            <span className="sr-only">{label}</span>
            <span
               className={`${
                  enabled ? "translate-x-7" : "translate-x-1"
               } inline-block h-6 w-6 transform rounded-full bg-white transition`}
            />
         </Switch>
      </div>
   );
};
export default ToggleSwitch;
