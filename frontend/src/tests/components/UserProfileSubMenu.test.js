import { screen, waitFor, fireEvent } from "@testing-library/react";
import UserProfileSubMenu from "../../components/Navbar/UserProfileSubMenu.jsx";
import { describe, expect, it } from "@jest/globals";
import { renderWithProviders } from "../../utils/testRenderFunc.js";
import { BrowserRouter } from "react-router-dom";

// Mocked Redux store setup

describe("User Profile Sub Menu", () => {
   it("renders Navbar component", () => {
      renderWithProviders(
         <BrowserRouter>
            <UserProfileSubMenu userId="123" />
         </BrowserRouter>
      );

      const accountLink = screen.getByTestId("account-profile");
      const poemsLink = screen.getByTestId("poems");
      const collectionsLink = screen.getByTestId("collections");
      const favoritesLink = screen.getByTestId("favorites");

      expect(accountLink).toBeInTheDocument();
      expect(poemsLink).toBeInTheDocument();
      expect(collectionsLink).toBeInTheDocument();
      expect(favoritesLink).toBeInTheDocument();
   });

   it("navigates to correct links when the links are clicked", async () => {
      renderWithProviders(
         <BrowserRouter>
            <UserProfileSubMenu userId="123" />
         </BrowserRouter>
      );

      const accountLink = screen.getByTestId("account-profile");
      const poemsLink = screen.getByTestId("poems");
      const collectionsLink = screen.getByTestId("collections");
      const favoritesLink = screen.getByTestId("favorites");

      fireEvent.click(accountLink);
      // Check if the route is navigated to /
      await waitFor(() => {
         expect(window.location.pathname).toBe("/user-profile/123");
      });

      fireEvent.click(poemsLink);
      // Check if the route is navigated to /
      await waitFor(() => {
         expect(window.location.pathname).toBe("/user-profile/123/poems");
      });

      fireEvent.click(collectionsLink);
      await waitFor(() => {
         expect(window.location.pathname).toBe("/user-profile/123/collections");
      });

      fireEvent.click(favoritesLink);
      // Check if the route is navigated to /
      await waitFor(() => {
         expect(window.location.pathname).toBe("/user-profile/123/favorites");
      });
   });
});
