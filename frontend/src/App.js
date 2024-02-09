import RootLayout from "./components/Layout/RootLayout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
   return (
      <>
         <RootLayout />
         <ToastContainer />
      </>
   );
}

export default App;
