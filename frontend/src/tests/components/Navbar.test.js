import { screen, waitFor, fireEvent } from "@testing-library/react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { describe, expect, it } from "@jest/globals";
import { renderWithProviders } from "../../utils/testRenderFunc.js";
import { BrowserRouter } from "react-router-dom";

describe("Navbar Component", () => {
   it("renders Navbar component", () => {
      renderWithProviders(
         <BrowserRouter>
            <Navbar />
         </BrowserRouter>
      );

      expect(screen.getByText("BreathingLines")).toBeInTheDocument();
      const signInIcon = screen.getByTestId("signin-link");

      expect(signInIcon).toBeInTheDocument();
   });

   it("navigates to /signin when user is not logged in and clicks on login icon", async () => {
      renderWithProviders(
         <BrowserRouter>
            <Navbar />
         </BrowserRouter>
      );

      fireEvent.click(screen.getByTestId("signin-link"));

      await waitFor(() => {
         expect(window.location.pathname).toBe("/signin");
      });
   });
});
