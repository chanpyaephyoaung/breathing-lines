import React from "react";

export const generatePoemContentMarkup = (content: string) => {
   console.log(content);
   return content.split("\n").map((c, i) => (
      <React.Fragment key={i}>
         {c.trim()}
         <br />
      </React.Fragment>
   ));
};
