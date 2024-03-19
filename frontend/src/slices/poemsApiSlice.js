import { POEMS_URL, UPLOAD_URL } from "../constants.js";
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
      uploadPoemCoverImage: builder.mutation({
         query: (data) => ({
            url: `${UPLOAD_URL}`,
            method: "POST",
            body: data,
         }),
      }),
      likePoem: builder.mutation({
         query: (poemId) => ({
            url: `${POEMS_URL}/${poemId}/like`,
            method: "PUT",
         }),
      }),
      ratePoem: builder.mutation({
         query: ({ poemId, rating }) => ({
            url: `${POEMS_URL}/${poemId}/rate`,
            method: "PUT",
            body: { rating },
         }),
      }),
      reviewPoem: builder.mutation({
         query: ({ poemId, review }) => ({
            url: `${POEMS_URL}/${poemId}/review`,
            method: "POST",
            body: { review },
         }),
      }),
   }),
});

export const {
   useGetAllPoemsQuery,
   useGetSinglePoemByIdQuery,
   useWriteNewPoemMutation,
   useUploadPoemCoverImageMutation,
   useLikePoemMutation,
   useRatePoemMutation,
   useReviewPoemMutation,
} = poemsApiSlice;
