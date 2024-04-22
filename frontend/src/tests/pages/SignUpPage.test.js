import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/testRenderFunc.js";
import { describe, expect, it } from "@jest/globals";
import SignUpPage from "../../screens/SignUpPage.jsx";
import { BrowserRouter } from "react-router-dom";

describe("Test Sign Up Page", () => {
   it("renders sign in form inputs and submit button", () => {
      renderWithProviders(
         <BrowserRouter>
            <SignUpPage />
         </BrowserRouter>
      );

      // Check whether the elements are rendered properly
      const heading = screen.getByTestId("heading");
      const nameInput = screen.getByPlaceholderText("name");
      const emailInput = screen.getByPlaceholderText("email address");
      const passwordInput = screen.getByPlaceholderText("password");
      const confirmPasswordInput = screen.getByPlaceholderText("confirm password");
      const submitBtn = screen.getByRole("button", { name: "Sign Up" });

      expect(heading).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
   });
});
