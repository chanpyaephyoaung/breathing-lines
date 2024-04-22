import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/testRenderFunc.js";
import { describe, expect, it } from "@jest/globals";
import SignInPage from "../../screens/SignInPage.jsx";
import { BrowserRouter } from "react-router-dom";

describe("Test Sign In Page", () => {
   it("renders sign in form inputs and submit button", () => {
      renderWithProviders(
         <BrowserRouter>
            <SignInPage />
         </BrowserRouter>
      );

      // Check whether the elements are rendered properly
      const heading = screen.getByTestId("heading");
      const emailInput = screen.getByPlaceholderText("email address");
      const passwordInput = screen.getByPlaceholderText("password");
      const submitBtn = screen.getByRole("button", { name: "Sign In" });

      expect(heading).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
   });
});
