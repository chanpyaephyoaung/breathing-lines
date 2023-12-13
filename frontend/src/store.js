import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.ts";
import authSliceReducer from "./slices/authSlice.ts";

const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authSliceReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true,
});

export default store;
