import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const usersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      signIn: builder.mutation({
         query: (authData) => ({
            url: `${USERS_URL}/signin`,
            method: "POST",
            body: authData,
         }),
      }),
   }),
});

export const { useSignInMutation } = usersApiSlice;
