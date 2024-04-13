import PoemOfTheDay from "./PoemOfTheDay.jsx";
import PoemsOfPreviousDays from "./PoemsOfPreviousDays/PoemsOfPreviousDays.jsx";
import { useGetPoemsOfTheDayQuery } from "../../../slices/poemsApiSlice.js";
import Message from "../../Typography/Message.jsx";
import LoaderSpinner from "../../UI/LoaderSpinner.jsx";

const PoemsOfTheDays = () => {
   const { data: poems, isLoading, error } = useGetPoemsOfTheDayQuery();

   return (
      <>
         {isLoading ? (
            <LoaderSpinner />
         ) : error ? (
            <Message type="danger">{error?.data?.errMessage || error.error}</Message>
         ) : (
            <div className="md:flex md:gap-x-4 md:justify-between mt-2 md:mt-4">
               <PoemOfTheDay poem={poems[0]} />
               <PoemsOfPreviousDays poems={poems.slice(1)} />
            </div>
         )}
      </>
   );
};
export default PoemsOfTheDays;
