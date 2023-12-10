import React from "react";
import Container from "../UI/Container.tsx";
import PoemsOfTheDays from "../Poems/PoemsOfTheDays/PoemsOfTheDays.tsx";

const HeaderSection = () => {
   return (
      <Container>
         <PoemsOfTheDays />
      </Container>
   );
};
export default HeaderSection;
