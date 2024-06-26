import { Link } from "react-router-dom";

const AdminDashboard = () => {
   return (
      <ul className="list-disc grid gap-y-2">
         <li>
            <Link
               to="/users/admin/usersList"
               data-testid="users"
               className="text-sm md:text-lg font-light text-clr-black hover:text-clr-primary hover:underline"
            >
               Users
            </Link>
         </li>
         <li>
            <Link
               to="/users/admin/poemsList"
               data-testid="poems"
               className="text-sm md:text-lg font-light text-clr-black hover:text-clr-primary hover:underline"
            >
               Poems
            </Link>
         </li>
      </ul>
   );
};
export default AdminDashboard;
