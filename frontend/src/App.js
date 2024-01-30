import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout.jsx";
import HomePage from "./screens/HomePage.jsx";
import ErrorPage from "./screens/ErrorPage.jsx";
import WritePoemPage from "./screens/WritePoemPage.jsx";
import SignInPage from "./screens/SignInPage.jsx";
import SignUpPage from "./screens/SignUpPage.jsx";
import PoemFullPost from "./components/Poems/PoemFullPost/PoemFullPost.jsx";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
         <Route index={true} element={<HomePage />} />
         <Route path="poem/:poemId" element={<PoemFullPost />} />
         <Route path="write" element={<WritePoemPage />} />
         <Route path="signin" element={<SignInPage />} />
         <Route path="signup" element={<SignUpPage />} />
      </Route>
   )
);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
