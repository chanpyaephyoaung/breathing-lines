import Container from "../UI/Container.jsx";
import PoemsOfTheDays from "../Poems/PoemsOfTheDays/PoemsOfTheDays.jsx";

const HeaderSection = () => {
   return (
      <Container>
         <div className="md:w-4/5 md:mx-auto">
            <PoemsOfTheDays />
         </div>
      </Container>
   );
};
export default HeaderSection;
