import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedComponent = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);

   return userAccInfo && userAccInfo.isAdmin ? <Outlet /> : <Navigate to={"/signin"} replace />;
};
export default AdminProtectedComponent;
