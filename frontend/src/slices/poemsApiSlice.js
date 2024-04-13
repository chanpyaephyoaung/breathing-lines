import { POEMS_URL, UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const poemsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllPoems: builder.query({
         query: ({ keyword }) => ({
            url: POEMS_URL,
            params: {
               keyword,
            },
         }),
         keepUnusedDataFor: 5,
      }),
      getSinglePoemById: builder.query({
         query: (poemId) => ({
            url: `${POEMS_URL}/${poemId}`,
         }),
         keepUnusedDataFor: 5,
      }),
      getPoemsOfTheDay: builder.query({
         query: () => ({
            url: `${POEMS_URL}/poemsOfTheDays`,
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
      editPoem: builder.mutation({
         query: ({ poemId, newPoemData }) => ({
            url: `${POEMS_URL}/${poemId}/edit`,
            method: "PUT",
            body: { newPoemData },
         }),
      }),
      deletePoem: builder.mutation({
         query: (poemId) => ({
            url: `${POEMS_URL}/${poemId}`,
            method: "DELETE",
         }),
      }),
      changePoemStatus: builder.mutation({
         query: ({ poemId, newPoemStatus }) => ({
            url: `${POEMS_URL}/${poemId}/change-status`,
            method: "PUT",
            body: { newPoemStatus },
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
      increasePoemViewCount: builder.mutation({
         query: (poemId) => ({
            url: `${POEMS_URL}/${poemId}/view`,
            method: "PUT",
            body: { poemId },
         }),
      }),
   }),
});

export const {
   useGetAllPoemsQuery,
   useGetSinglePoemByIdQuery,
   useGetPoemsOfTheDayQuery,
   useWriteNewPoemMutation,
   useEditPoemMutation,
   useDeletePoemMutation,
   useChangePoemStatusMutation,
   useUploadPoemCoverImageMutation,
   useLikePoemMutation,
   useRatePoemMutation,
   useReviewPoemMutation,
   useIncreasePoemViewCountMutation,
} = poemsApiSlice;
