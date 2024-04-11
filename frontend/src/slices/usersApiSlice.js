import { USERS_URL, UPLOAD_URL } from "../constants.js";
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
         query: (userId) => ({
            url: `${USERS_URL}/user-profile/${userId}`,
         }),
         keepUnusedDataFor: 5,
      }),
      updateAccDetails: builder.mutation({
         query: (newAccDetails) => ({
            url: `${USERS_URL}/user-profile/account/update`,
            method: "PUT",
            body: newAccDetails,
         }),
      }),
      uploadUserProfileImage: builder.mutation({
         query: (data) => ({
            url: `${UPLOAD_URL}`,
            method: "POST",
            body: data,
         }),
      }),
      updateUserProfile: builder.mutation({
         query: ({ newProfileData, userId }) => ({
            url: `${USERS_URL}/user-profile/${userId}`,
            method: "PUT",
            body: { newProfileData },
         }),
      }),
      createAuthorProfileReview: builder.mutation({
         query: ({ userId, review }) => ({
            url: `${USERS_URL}/${userId}/profile-review`,
            method: "POST",
            body: { review },
         }),
      }),
      increaseProfileViewCount: builder.mutation({
         query: (userId) => ({
            url: `${USERS_URL}/${userId}/view`,
            method: "PUT",
            body: { userId },
         }),
      }),
      subscribeUser: builder.mutation({
         query: (userId) => ({
            url: `${USERS_URL}/${userId}/subscribe`,
            method: "PUT",
         }),
      }),
      getPoemsOfUser: builder.query({
         query: ({ userId, status }) => ({
            url: `${USERS_URL}/user-profile/${userId}/poems/${status}`,
         }),
      }),
      getFollowersOfUser: builder.query({
         query: (userId) => ({
            url: `${USERS_URL}/user-profile/${userId}/followers`,
         }),
      }),
      getFollowingsOfUser: builder.query({
         query: (userId) => ({
            url: `${USERS_URL}/user-profile/${userId}/followings`,
         }),
      }),
      getNotificationsOfUser: builder.query({
         query: (userId) => ({
            url: `${USERS_URL}/${userId}/notifications`,
         }),
      }),
      createNewNotification: builder.mutation({
         query: ({ userId, newNotiData }) => ({
            url: `${USERS_URL}/${userId}/notifications/new`,
            method: "POST",
            body: { newNotiData },
         }),
      }),
      updateUnreadNotiCount: builder.mutation({
         query: ({ userId, defaultCount = null }) => ({
            url: `${USERS_URL}/${userId}/notifications/unread`,
            method: "POST",
            body: { userId, defaultCount },
         }),
      }),
      getUnreadNotiCount: builder.query({
         query: (userId) => ({
            url: `${USERS_URL}/${userId}/notifications/unread`,
         }),
      }),
      deleteUserAcc: builder.mutation({
         query: (userId) => ({
            url: `${USERS_URL}/${userId}/delete`,
            method: "DELETE",
         }),
      }),
   }),
});

export const {
   useSignInMutation,
   useSignOutMutation,
   useSignUpMutation,
   useGetUserProfileQuery,
   useUpdateAccDetailsMutation,
   useUploadUserProfileImageMutation,
   useUpdateUserProfileMutation,
   useCreateAuthorProfileReviewMutation,
   useIncreaseProfileViewCountMutation,
   useSubscribeUserMutation,
   useGetPoemsOfUserQuery,
   useGetFollowersOfUserQuery,
   useGetFollowingsOfUserQuery,
   useGetNotificationsOfUserQuery,
   useCreateNewNotificationMutation,
   useGetUnreadNotiCountQuery,
   useUpdateUnreadNotiCountMutation,
   useDeleteUserAccMutation,
} = usersApiSlice;
