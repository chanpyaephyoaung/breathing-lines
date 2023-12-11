import React from "react";
import { dummyPoems } from "../../../../sampleData.js";
import PoemsOfPreviousDay from "./PoemsOfPreviousDay.tsx";

const poemOfPrevDay = dummyPoems[0];
const poemOfPrevDay1 = dummyPoems[1];

const PoemsOfPreviousDays = () => {
   return (
      <div className="hidden md:grid gap-y-2">
         <PoemsOfPreviousDay poem={poemOfPrevDay} />
         <PoemsOfPreviousDay poem={poemOfPrevDay1} />
      </div>
   );
};
export default PoemsOfPreviousDays;
