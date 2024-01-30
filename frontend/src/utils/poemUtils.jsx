export const generatePoemContentMarkup = (content) => {
   return content.split("\n").map((c) => (
      <>
         {c}
         <br />
      </>
   ));
};
