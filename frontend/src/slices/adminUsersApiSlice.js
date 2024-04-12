import { ADMIN_USER_BASE_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const adminUsersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllUsers: builder.query({
         query: ({ pageNum }) => ({
            url: `${ADMIN_USER_BASE_URL}/usersList`,
            params: {
               pageNum,
            },
         }),
      }),
      banUserAcc: builder.mutation({
         query: (userId) => ({
            url: `${ADMIN_USER_BASE_URL}/${userId}/ban`,
            method: "PUT",
            body: { userId },
         }),
      }),
      getAllPoemsByAdmin: builder.query({
         query: ({ pageNum, filterOption }) => ({
            url: `${ADMIN_USER_BASE_URL}/poemsList`,
            params: {
               pageNum,
               filterOption,
            },
         }),
      }),
   }),
});

export const { useGetAllUsersQuery, useBanUserAccMutation, useGetAllPoemsByAdminQuery } =
   adminUsersApiSlice;
