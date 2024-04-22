import { screen } from "@testing-library/react";
import SearchForm from "../../components/Forms/SearchForm.jsx";
import { describe, expect, it } from "@jest/globals";
import { renderWithProviders } from "../../utils/testRenderFunc.js";
import { BrowserRouter } from "react-router-dom";

describe("Search Form Component", () => {
   it("renders Navbar component", () => {
      renderWithProviders(
         <BrowserRouter>
            <SearchForm />
         </BrowserRouter>
      );

      const searchInput = screen.getByPlaceholderText("search for a poem...");

      expect(searchInput).toBeInTheDocument();
   });
});
