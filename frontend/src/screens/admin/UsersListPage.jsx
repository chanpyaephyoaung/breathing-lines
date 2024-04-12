import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/UI/Container.jsx";
import LoaderSpinner from "../../components/UI/LoaderSpinner.jsx";
import Message from "../../components/Typography/Message.jsx";
import Modal from "../../components/UI/Modal.jsx";
import { useGetAllUsersQuery } from "../../slices/adminUsersApiSlice.js";
import { useDeleteUserAccMutation } from "../../slices/usersApiSlice.js";
import { toast } from "react-toastify";

const UsersListPage = () => {
   const [targetUser, setTargetUser] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [ctaType, setCtaType] = useState("");
   const [modalDesc, setModalDesc] = useState("");

   const [deleteUserAcc, { isLoading: loadingDeleteUserAcc }] = useDeleteUserAccMutation();

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const openModal = () => {
      setIsModalOpen(true);
   };

   const banUserHandler = (id) => {
      setTargetUser(id);
      setCtaType("ban");
      setModalDesc("Do you really wish to ban this user?");
      openModal();
   };

   const removeUserHandler = (id) => {
      setTargetUser(id);
      setCtaType("remove");
      setModalDesc("Do you really wish to remove this user? This action cannot be undone.");
      openModal();
   };

   const ctaHandler = async () => {
      try {
         if (ctaType === "ban") {
            console.log("Ban user");
         } else if (ctaType === "remove") {
            console.log(targetUser);
            await deleteUserAcc(targetUser).unwrap();
            refetch();
            toast.success("Account deleted successfully!");
         }
      } catch (err) {
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   const { pageNum } = useParams();
   const { data, error, isLoading, refetch } = useGetAllUsersQuery({ pageNum });

   return (
      <>
         <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
            desc={modalDesc}
            confirmBtnText="Confirm"
            successFunc={ctaHandler}
         >
            {loadingDeleteUserAcc && <LoaderSpinner />}
         </Modal>
         <Container>
            {isLoading ? (
               <LoaderSpinner />
            ) : error ? (
               <Message type="danger">{error?.data?.errMessage || error.error}</Message>
            ) : (
               <>
                  <h2 className="text-lg md:text-2xl font-bold text-clr-black mb-4">Users List</h2>
                  <table className="w-full table-auto">
                     <thead>
                        <tr className="bg-clr-primary text-clr-white">
                           <th className="p-2 border-2 border-clr-black-faded">ID</th>
                           <th className="p-2 border-2 border-clr-black-faded">Name</th>
                           <th className="p-2 border-2 border-clr-black-faded">Email</th>
                           <th className="p-2 border-2 border-clr-black-faded">Poems</th>
                           <th className="p-2 border-2 border-clr-black-faded">&nbsp;</th>
                           <th className="p-2 border-2 border-clr-black-faded">&nbsp;</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data?.allUsers?.map((user) => {
                           return (
                              <tr key={user._id}>
                                 <td className="p-2 border-2 border-clr-black-faded">{user._id}</td>
                                 <td className="p-2 border-2 border-clr-black-faded">
                                    {user.name}
                                 </td>
                                 <td className="p-2 border-2 border-clr-black-faded">
                                    {user.email}
                                 </td>
                                 <td className="p-2 border-2 border-clr-black-faded">
                                    <Link className="text-sm md:text-base font-light text-clr-danger hover:underline">
                                       View
                                    </Link>
                                 </td>
                                 <td className="p-2 border-2 border-clr-black-faded">
                                    <button
                                       type="button"
                                       onClick={() => banUserHandler(user._id)}
                                       className="text-sm md:text-base font-light text-clr-danger hover:underline"
                                    >
                                       Ban
                                    </button>
                                 </td>
                                 <td className="p-2 border-2 border-clr-black-faded">
                                    <button
                                       type="button"
                                       onClick={() => removeUserHandler(user._id)}
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
                           to={`page/${x + 1}`}
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
export default UsersListPage;
