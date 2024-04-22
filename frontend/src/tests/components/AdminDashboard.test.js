import { screen, waitFor, fireEvent } from "@testing-library/react";
import AdminDashboard from "../../components/Admin/AdminDashboard.jsx";
import { describe, expect, it } from "@jest/globals";
import { renderWithProviders } from "../../utils/testRenderFunc.js";
import { BrowserRouter } from "react-router-dom";

// Mocked Redux store setup

describe("Admin Dashboard", () => {
   it("renders links properly", () => {
      renderWithProviders(
         <BrowserRouter>
            <AdminDashboard />
         </BrowserRouter>
      );

      const usersLink = screen.getByTestId("users");
      const poemsLink = screen.getByTestId("poems");

      expect(usersLink).toBeInTheDocument();
      expect(poemsLink).toBeInTheDocument();
   });

   it("navigates to correct links when the links are clicked", async () => {
      renderWithProviders(
         <BrowserRouter>
            <AdminDashboard />
         </BrowserRouter>
      );

      const usersLink = screen.getByTestId("users");
      const poemsLink = screen.getByTestId("poems");

      fireEvent.click(usersLink);
      // Check if the route is navigated to /
      await waitFor(() => {
         expect(window.location.pathname).toBe("/users/admin/usersList");
      });

      fireEvent.click(poemsLink);
      // Check if the route is navigated to /
      await waitFor(() => {
         expect(window.location.pathname).toBe("/users/admin/poemsList");
      });
   });
});
