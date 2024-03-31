import { useParams } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Container from "../components/UI/Container";
import PoemPreviewPostsDrafted from "../components/Poems/PoemPreview/PoemPreviewDrafted/PoemPreviewPostsDrafted.jsx";

const UserPoemsDraftPage = () => {
   const { status } = useParams();

   return (
      <Container>
         <>
            <div className="flex items-center gap-x-6">
               <ArrowLongLeftIcon className="h-10 w-10 text-clr-black" />
               <h2 className="text-lg md:text-2xl font-bold text-clr-black">My Drafts</h2>
            </div>
            <PoemPreviewPostsDrafted statusType={status} />
         </>
      </Container>
   );
};
export default UserPoemsDraftPage;
