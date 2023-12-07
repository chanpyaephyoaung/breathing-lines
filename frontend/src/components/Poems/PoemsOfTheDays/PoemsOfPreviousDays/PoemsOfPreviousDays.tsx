import React from "react";
import PoemsOfPreviousDay from "./PoemsOfPreviousDay.tsx";

const PoemsOfPreviousDays = () => {
   return (
      <div className="hidden md:grid gap-y-2">
         <PoemsOfPreviousDay />
         <PoemsOfPreviousDay />
      </div>
   );
};
export default PoemsOfPreviousDays;
