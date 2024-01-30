import PoemPreviewPost from "./PoemPreviewPost.jsx";
import { dummyPoems } from "../../../sampleData.js";

const PoemPreviewPosts = () => {
   return (
      <div className="mt-6 w-4/6 md:w-5/6 max-w-[900px] mx-auto grid gap-6 py-5 md:grid-cols-2">
         {dummyPoems.map((poem) => (
            <PoemPreviewPost
               key={poem.id}
               id={poem.id}
               datePosted={poem.datePosted}
               viewsCount={poem.viewsCount}
               coverImg={poem.coverImg}
               title={poem.title}
               author={poem.author}
               content={poem.content}
            />
         ))}
      </div>
   );
};
export default PoemPreviewPosts;
