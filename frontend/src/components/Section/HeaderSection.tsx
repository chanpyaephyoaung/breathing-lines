import React from "react";
import Container from "../UI/Container.tsx";
import PoemsOfTheDays from "../Poems/PoemsOfTheDays/PoemsOfTheDays.tsx";

const HeaderSection = ({ userType }) => {
   return (
      <Container>
         <PoemsOfTheDays />
      </Container>
   );
};
export default HeaderSection;
