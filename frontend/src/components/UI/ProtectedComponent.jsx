import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedComponent = () => {
   const { userAccInfo } = useSelector((state) => state.authUser);

   return userAccInfo ? <Outlet /> : <Navigate to={"/signin"} replace />;
};
export default ProtectedComponent;
