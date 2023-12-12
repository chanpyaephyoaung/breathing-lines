import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PoemsOfPreviousDay from "./PoemsOfPreviousDay.tsx";

const PoemsOfPreviousDays = () => {
   const [poemOfPrevDay1, setPoemOfPrevDay1] = useState({
      _id: {},
      datePosted: "",
      viewsCount: 0,
      coverImg: "",
      title: "",
      author: "",
      content: "",
      tags: [],
   });

   const [poemOfPrevDay2, setPoemOfPrevDay2] = useState({
      _id: {},
      datePosted: "",
      viewsCount: 0,
      coverImg: "",
      title: "",
      author: "",
      content: "",
      tags: [],
   });

   useEffect(() => {
      async function fetchPoem() {
         const { data } = await axios.get(`/api/poems`);
         setPoemOfPrevDay1(data[0]);
         setPoemOfPrevDay2(data[1]);
      }

      fetchPoem();
   }, []);

   return (
      <div className="hidden md:grid gap-y-2">
         <PoemsOfPreviousDay poem={poemOfPrevDay1} />
         <PoemsOfPreviousDay poem={poemOfPrevDay2} />
      </div>
   );
};
export default PoemsOfPreviousDays;
