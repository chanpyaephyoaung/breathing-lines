import PoemPreviewPost from "./PoemPreviewPost.jsx";

const PoemPreviewPosts = ({
   poems,
   removePoemFromCollectionHandler,
   loadingRemovePoemFromCollection,
   isCurrentUserTheCollectionOwner,
}) => {
   return (
      <>
         <div className="mt-6 w-4/6 md:w-5/6 max-w-[450px] mx-auto grid gap-6 py-5">
            {poems?.map((poem) => (
               <PoemPreviewPost
                  key={poem._id}
                  poemId={poem._id}
                  publishedAt={poem.publishedAt}
                  viewsCount={poem.viewsCount}
                  coverImg={poem.coverImg}
                  title={poem.title}
                  author={poem.author}
                  content={poem.content}
                  encodedCoverImg={poem.encodedCoverImg || ""}
                  onRemovePoemFromCollection={removePoemFromCollectionHandler}
                  loadingRemovePoemFromCollection={loadingRemovePoemFromCollection}
                  isCurrentUserTheCollectionOwner={isCurrentUserTheCollectionOwner}
               />
            ))}
         </div>
      </>
   );
};
export default PoemPreviewPosts;
