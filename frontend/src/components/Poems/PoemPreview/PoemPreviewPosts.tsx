import React from "react";
import PoemPreviewPost from "./PoemPreviewPost.tsx";

const PoemPreviewPosts = () => {
   return (
      <div className="w-4/6 mx-auto grid gap-6 py-5">
         <PoemPreviewPost />
         <PoemPreviewPost />
      </div>
   );
};
export default PoemPreviewPosts;
