import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { apiSlice } from "../slices/apiSlice.js";
import authUserSlice from "../slices/authSlice.js";

export function renderWithProviders(
   ui,
   {
      preloadedState = {},
      // Automatically create a store instance if no store was passed in
      store = configureStore({
         reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            authUser: authUserSlice,
         },
         middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
         preloadedState,
      }),
      ...renderOptions
   } = {}
) {
   function Wrapper({ children }) {
      return <Provider store={store}>{children}</Provider>;
   }

   // Return an object with the store and all of RTL's query functions
   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
