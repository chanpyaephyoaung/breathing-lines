import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FormContainer from "./FormContainer.jsx";
import Message from "../Typography/Message.jsx";

const PrivateComponent = () => {
   const { userId: targetUserId } = useParams();
   const { userAccInfo } = useSelector((state) => state.authUser);

   const currentUserId = userAccInfo._id;

   const isCurrentUserTheTargetUser = currentUserId.toString() === targetUserId.toString();

   return isCurrentUserTheTargetUser ? (
      <Outlet />
   ) : (
      <FormContainer>
         <Message type="danger">Unauthorised Access.</Message>
      </FormContainer>
   );
};
export default PrivateComponent;
