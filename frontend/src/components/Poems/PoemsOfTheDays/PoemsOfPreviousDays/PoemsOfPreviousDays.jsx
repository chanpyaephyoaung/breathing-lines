import PoemsOfPreviousDay from "./PoemsOfPreviousDay.jsx";

const PoemsOfPreviousDays = ({ poems }) => {
   return (
      <div className="hidden md:grid gap-y-2">
         <PoemsOfPreviousDay poem={poems[0]} label="Yesterday" />
         <PoemsOfPreviousDay poem={poems[1]} label="2 Days Ago" />
      </div>
   );
};
export default PoemsOfPreviousDays;
