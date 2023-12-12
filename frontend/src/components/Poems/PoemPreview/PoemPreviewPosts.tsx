import React from "react";
import PoemPreviewPost from "./PoemPreviewPost.tsx";
import { useGetPoemsQuery } from "../../../slices/poemsApiSlice.ts";

const PoemPreviewPosts = () => {
   const { data: poems, isLoading, error } = useGetPoemsQuery();

   let errorMsg: string | undefined = "";

   if (error) {
      if ("status" in error) {
         // you can access all properties of `FetchBaseQueryError` here
         errorMsg = "error" in error ? error.error : JSON.stringify(error.data);
      } else {
         // you can access all properties of `SerializedError` here
         errorMsg = error.message;
      }
   }

   return (
      <div className="mt-6 w-4/6 md:w-5/6 max-w-[950px] mx-auto grid gap-10 py-5 md:grid-cols-2">
         {isLoading ? (
            <h2>Loading...</h2>
         ) : error ? (
            <h2>{errorMsg}</h2>
         ) : (
            <>
               {poems?.map((poem) => (
                  <PoemPreviewPost
                     key={poem["_id"]}
                     id={poem["_id"]}
                     date={poem["date"]}
                     viewsCount={poem["viewsCount"]}
                     coverImg={poem["coverImg"]}
                     title={poem["title"]}
                     author={poem["author"]}
                     content={poem["content"]}
                  />
               ))}
            </>
         )}
      </div>
   );
};
export default PoemPreviewPosts;
