import React from "react";
import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout.tsx";
import HomePage from "./screens/HomePage.tsx";
import ErrorPage from "./screens/ErrorPage.tsx";
import WritePoemPage from "./screens/WritePoemPage.tsx";
import SignInPage from "./screens/SignInPage.tsx";
import SignUpPage from "./screens/SignUpPage.tsx";
import PoemFullPost from "./components/Poems/PoemFullPost/PoemFullPost.tsx";

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
