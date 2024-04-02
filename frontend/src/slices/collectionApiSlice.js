import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const collectionsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getCollectionsOfUser: builder.query({
         query: (userId) => ({
            url: `${USERS_URL}/user-profile/${userId}/collections`,
         }),
      }),
      getOneCollectionOfUser: builder.query({
         query: ({ userId, collectionId }) => ({
            url: `${USERS_URL}/user-profile/${userId}/collections/${collectionId}`,
         }),
      }),
      createNewCollection: builder.mutation({
         query: ({ userId, collectionName }) => ({
            url: `${USERS_URL}/user-profile/${userId}/collections`,
            method: "POST",
            body: { collectionName },
         }),
      }),
   }),
});

export const {
   useGetCollectionsOfUserQuery,
   useGetOneCollectionOfUserQuery,
   useCreateNewCollectionMutation,
} = collectionsApiSlice;