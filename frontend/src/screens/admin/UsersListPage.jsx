import { Link, useParams } from "react-router-dom";
import Container from "../../components/UI/Container.jsx";
import LoaderSpinner from "../../components/UI/LoaderSpinner.jsx";
import Message from "../../components/Typography/Message.jsx";
import { useGetAllUsersQuery } from "../../slices/adminUsersApiSlice.js";

const UsersListPage = () => {
   const { pageNum } = useParams();
   const { data, error, isLoading, refetch } = useGetAllUsersQuery({ pageNum });

   console.log(data);
   return (
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
                              <td className="p-2 border-2 border-clr-black-faded">{user.name}</td>
                              <td className="p-2 border-2 border-clr-black-faded">{user.email}</td>
                              <td className="p-2 border-2 border-clr-black-faded">
                                 <button className="text-sm md:text-base font-light text-clr-danger hover:underline">
                                    View
                                 </button>
                              </td>
                              <td className="p-2 border-2 border-clr-black-faded">
                                 <button className="text-sm md:text-base font-light text-clr-danger hover:underline">
                                    Ban
                                 </button>
                              </td>
                              <td className="p-2 border-2 border-clr-black-faded">
                                 <button className="text-sm md:text-base font-light text-clr-danger hover:underline">
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
   );
};
export default UsersListPage;
