import PoemOfTheDay from "./PoemOfTheDay.jsx";
import PoemsOfPreviousDays from "./PoemsOfPreviousDays/PoemsOfPreviousDays.jsx";

const PoemsOfTheDays = () => {
   return (
      <div className="md:flex md:gap-x-6 md:justify-between mt-2 md:mt-14">
         <PoemOfTheDay />
         <PoemsOfPreviousDays />
      </div>
   );
};
export default PoemsOfTheDays;
