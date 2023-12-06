import React from "react";
import Container from "../UI/Container.tsx";
import SubMenu from "../Navbar/SubMenu.tsx";
import PoemOfTheDay from "../Poems/PoemOfTheDay.tsx";

const HeaderSection = ({ userType }) => {
   return (
      <Container>
         <SubMenu userType={userType} />
         <PoemOfTheDay />
      </Container>
   );
};
export default HeaderSection;
