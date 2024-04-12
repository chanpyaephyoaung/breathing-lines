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
   }),
});

export const { useGetAllUsersQuery } = adminUsersApiSlice;
