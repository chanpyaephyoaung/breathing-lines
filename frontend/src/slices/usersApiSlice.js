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
      signOut: builder.mutation({
         query: () => ({
            url: `${USERS_URL}/signout`,
            method: "POST",
         }),
      }),
      signUp: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/register`,
            method: "POST",
            body: data,
         }),
      }),
      getUserProfile: builder.query({
         query: () => ({
            url: `${USERS_URL}/account-profile`,
         }),
         keepUnusedDataFor: 5,
      }),
   }),
});

export const { useSignInMutation, useSignOutMutation, useSignUpMutation, useGetUserProfileQuery } =
   usersApiSlice;