import React from "react";
import RootLayout from "../components/Layout/RootLayout.tsx";
import Container from "../components/UI/Container.tsx";

const ErrorPage = () => {
   return (
      <>
         <RootLayout />
         <Container>
            <h1 className="">Error Page</h1>
         </Container>
      </>
   );
};
export default ErrorPage;
