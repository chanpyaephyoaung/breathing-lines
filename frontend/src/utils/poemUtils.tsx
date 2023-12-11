import React from "react";

export const generatePoemContentMarkup = (content) => {
   return content.split("\n").map((c, i) => (
      <React.Fragment key={i}>
         {c}
         <br />
      </React.Fragment>
   ));
};
