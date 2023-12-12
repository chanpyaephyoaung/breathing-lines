import { POEMS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

type Poems = [
   {
      id: string;
      date: Date;
      viewsCount: number;
      likesCount: number;
      reviewsCount: number;
      sharesCount: number;
      coverImg: string;
      title: string;
      user: object;
      content: string;
      tags: string[];
   }
];

type Poem = {
   id: string;
   date: Date;
   viewsCount: number;
   likesCount: number;
   reviewsCount: number;
   sharesCount: number;
   coverImg: string;
   title: string;
   user: object;
   content: string;
   tags: string[];
   author: string;
};

export const poemsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getPoems: builder.query<Poems, void>({
         query: () => ({
            url: POEMS_URL,
         }),
         keepUnusedDataFor: 5,
      }),
      getPoemDetails: builder.query<Poem, string | undefined>({
         query: (poemId) => ({
            url: `${POEMS_URL}/${poemId}`,
         }),
         keepUnusedDataFor: 5,
      }),
   }),
});

export const { useGetPoemsQuery, useGetPoemDetailsQuery } = poemsApiSlice;
