import { POEMS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const poemsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllPoems: builder.query({
         query: () => ({
            url: POEMS_URL,
         }),
         keepUnusedDataFor: 5,
      }),
      getSinglePoemById: builder.query({
         query: (poemId) => ({
            url: `${POEMS_URL}/${poemId}`,
         }),
         keepUnusedDataFor: 5,
      }),
      writeNewPoem: builder.mutation({
         query: (newPoemData) => ({
            url: `${POEMS_URL}/write`,
            method: "POST",
            body: newPoemData,
         }),
      }),
   }),
});

export const { useGetAllPoemsQuery, useGetSinglePoemByIdQuery, useWriteNewPoemMutation } =
   poemsApiSlice;
