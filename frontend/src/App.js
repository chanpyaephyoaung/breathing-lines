import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import RootLayout from "./components/Layout/RootLayout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io.connect("http://localhost:3001");

function App() {
   const { userAccInfo } = useSelector((state) => state.authUser);

   useEffect(() => {
      socket.emit("newUser", userAccInfo?._id);

      console.log("Socket from App.js: ", socket);
   }, [userAccInfo?._id]);

   return (
      <>
         <RootLayout socket={socket} />
         <ToastContainer />
      </>
   );
}

export default App;
