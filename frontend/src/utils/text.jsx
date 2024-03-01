export const generateLineBreakBtwSentences = (content) => {
   return content.split("\n").map((c) => (
      <>
         {c}
         <br />
      </>
   ));
};
