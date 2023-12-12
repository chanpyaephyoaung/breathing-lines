import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PoemPreviewPost from "./PoemPreviewPost.tsx";
// import { dummyPoems } from "../../../sampleData.js";

const PoemPreviewPosts = () => {
   const [poems, setPoems] = useState([]);

   useEffect(() => {
      const fetchPoems = async () => {
         const { data } = await axios.get("/api/poems");
         setPoems(data);
      };

      fetchPoems();
   }, []);

   return (
      <div className="mt-6 w-4/6 md:w-5/6 max-w-[950px] mx-auto grid gap-10 py-5 md:grid-cols-2">
         {poems.map((poem) => (
            <PoemPreviewPost
               key={poem["id"]}
               id={poem["id"]}
               datePosted={poem["datePosted"]}
               viewsCount={poem["viewsCount"]}
               coverImg={poem["coverImg"]}
               title={poem["title"]}
               author={poem["author"]}
               content={poem["content"]}
            />
         ))}
      </div>
   );
};
export default PoemPreviewPosts;
