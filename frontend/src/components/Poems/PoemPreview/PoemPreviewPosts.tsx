import React from "react";
import PoemPreviewPost from "./PoemPreviewPost.tsx";

const PoemPreviewPosts = () => {
   return (
      <div className="mt-6 w-4/6 md:w-5/6 max-w-[900px] mx-auto grid gap-6 py-5 md:grid-cols-2">
         <PoemPreviewPost />
         <PoemPreviewPost />
         <PoemPreviewPost />
      </div>
   );
};
export default PoemPreviewPosts;
