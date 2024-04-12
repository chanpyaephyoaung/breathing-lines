import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/UI/Container.jsx";
import LoaderSpinner from "../../components/UI/LoaderSpinner.jsx";
import Message from "../../components/Typography/Message.jsx";
import Modal from "../../components/UI/Modal.jsx";
import {
   useGetAllPoemsByAdminQuery,
   useAwardPoemOfTheDayMutation,
} from "../../slices/adminUsersApiSlice.js";
import { useDeletePoemMutation } from "../../slices/poemsApiSlice.js";
import { toast } from "react-toastify";
import TimeAgo from "javascript-time-ago";
import PoemFilterDropDown from "../../components/Navbar/Dropdown/PoemFilterDropdown.jsx";

const timeAgo = new TimeAgo("en-US");

const PoemsListPage = () => {
   const [targetPoemId, setTargetPoemId] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [ctaType, setCtaType] = useState("");
   const [modalDesc, setModalDesc] = useState("");
   const [filter, setFilter] = useState("title");

   const filterOptionHandler = (option) => {
      setFilter(option);
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const openModal = () => {
      setIsModalOpen(true);
   };

   const awardPoemOfTheDayHandler = (id) => {
      setTargetPoemId(id);
      setCtaType("award");
      setModalDesc("Do you really wish to award this poem as Poem of the Day?");
      openModal();
   };

   const removePoemHandler = (id) => {
      setTargetPoemId(id);
      setCtaType("remove");
      setModalDesc("Do you really wish to remove this poem? This action cannot be undone.");
      openModal();
   };

   const ctaHandler = async () => {
      try {
         if (ctaType === "remove") {
            await deletePoem(targetPoemId).unwrap();
            refetch();
            toast.success("Poem deleted successfully!");
            closeModal();
         } else if (ctaType === "award") {
            await awardPoemOfTheDay(targetPoemId).unwrap();
            refetch();
            toast.success("Poem awarded as Poem of the Day successfully!");
            closeModal();
         }
      } catch (err) {
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   const { pageNum, filterOption = filter } = useParams();
   const { data, error, isLoading, refetch } = useGetAllPoemsByAdminQuery({
      pageNum,
      filterOption,
   });

   const [deletePoem, { isLoading: loadingDeletePoem }] = useDeletePoemMutation();
   const [awardPoemOfTheDay, { isLoading: loadingAwardPoemOfTheDay }] =
      useAwardPoemOfTheDayMutation();

   return (
      <>
         <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
            desc={modalDesc}
            confirmBtnText="Confirm"
            successFunc={ctaHandler}
         >
            {(loadingDeletePoem || loadingAwardPoemOfTheDay) && <LoaderSpinner />}
         </Modal>
         {}
         <Container>
            {isLoading ? (
               <LoaderSpinner />
            ) : error ? (
               <Message type="danger">{error?.data?.errMessage || error.error}</Message>
            ) : (
               <>
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-lg md:text-2xl font-bold text-clr-black">Poems List</h2>
                     <PoemFilterDropDown onChangeFilterOption={filterOptionHandler} />
                  </div>
                  <table className="w-full table-auto">
                     <thead>
                        <tr className="bg-clr-primary text-clr-white">
                           <th className="p-2 border-2 border-clr-black-faded">ID</th>
                           <th className="p-2 border-2 border-clr-black-faded">Title</th>
                           <th className="p-2 border-2 border-clr-black-faded">Author</th>
                           <th className="p-2 border-2 border-clr-black-faded">Like Count</th>
                           <th className="p-2 border-2 border-clr-black-faded">Date Published</th>
                           <th className="p-2 border-2 border-clr-black-faded">Poem of the day</th>
                           <th className="p-2 border-2 border-clr-black-faded">&nbsp;</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data?.allPoems?.map((poem) => {
                           return (
                              <tr key={poem._id}>
                                 <td className="p-2 border-2 border-clr-black-faded">{poem._id}</td>
                                 <td className="p-2 border-2 border-clr-black-faded">
                                    {poem.title}
                                 </td>
                                 <td className="p-2 border-2 border-clr-black-faded">
                                    {poem.author.name}
                                 </td>
                                 <td className="p-2 border-2 border-clr-black-faded">
                                    {poem.likesCount}
                                 </td>
                                 <td className="p-2 border-2 border-clr-black-faded">
                                    {timeAgo.format(new Date(poem.publishedAt))}
                                 </td>
                                 <td className="p-2 border-2 border-clr-black-faded">
                                    <button
                                       type="button"
                                       onClick={() => awardPoemOfTheDayHandler(poem._id)}
                                       className="text-sm md:text-base font-light text-clr-danger hover:underline"
                                    >
                                       Award
                                    </button>
                                 </td>
                                 <td className="p-2 border-2 border-clr-black-faded">
                                    <button
                                       type="button"
                                       onClick={() => removePoemHandler(poem._id)}
                                       className="text-sm md:text-base font-light text-clr-danger hover:underline"
                                    >
                                       Remove
                                    </button>
                                 </td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
                  <div className="flex gap-x-2 my-8">
                     {[...Array(data?.pages).keys()].map((x) => (
                        <Link
                           to={`page/${x + 1}/filter/${filterOption}`}
                           className={`font-light text-sm md:text-lg ${
                              x + 1 == data?.page ? "text-clr-primary font-medium" : ""
                           }`}
                           key={x + 1}
                        >
                           <button key={x + 1} className="hover:underline hover:text-clr-primary">
                              {x + 1}
                           </button>
                        </Link>
                     ))}
                  </div>
               </>
            )}
         </Container>
      </>
   );
};
export default PoemsListPage;
