import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/testRenderFunc.js";
import { describe, expect, it } from "@jest/globals";
import WritePoemPage from "../../screens/WritePoemPage.jsx";
import { BrowserRouter } from "react-router-dom";

describe("Test Write Poem Page", () => {
   it("renders sign in form inputs and submit button", () => {
      renderWithProviders(
         <BrowserRouter>
            <WritePoemPage />
         </BrowserRouter>
      );

      // Check whether the elements are rendered properly
      const heading = screen.getByTestId("heading");
      const titleInput = screen.getByPlaceholderText("title");
      const contentInput = screen.getByTestId("content");
      const coverImgInput = screen.getByPlaceholderText("Enter cover image url");
      const genreInput = screen.getByPlaceholderText("genre (e.g. love, nature)");
      const discrdBtn = screen.getByRole("button", { name: "Discard" });
      const draftBtn = screen.getByRole("button", { name: "Draft" });
      const publishBtn = screen.getByRole("button", { name: "Publish" });

      expect(heading).toBeInTheDocument();
      expect(titleInput).toBeInTheDocument();
      expect(contentInput).toBeInTheDocument();
      expect(coverImgInput).toBeInTheDocument();
      expect(genreInput).toBeInTheDocument();
      expect(draftBtn).toBeInTheDocument();
      expect(discrdBtn).toBeInTheDocument();
      expect(publishBtn).toBeInTheDocument();
   });
});
