import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals.js";
import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import "./index.css";
import App from "./App.js";
import HomePage from "./screens/HomePage.jsx";
import ErrorPage from "./screens/ErrorPage.jsx";
import WritePoemPage from "./screens/WritePoemPage.jsx";
import SignInPage from "./screens/SignInPage.jsx";
import SignUpPage from "./screens/SignUpPage.jsx";
import PoemFullPost from "./components/Poems/PoemFullPost/PoemFullPost.jsx";
import ProtectedComponent from "./components/UI/ProtectedComponent.jsx";
import UserProfilePage from "./screens/UserProfilePage.jsx";
import AccountUpdatePage from "./screens/AccountUpdatePage.jsx";
import UserProfileUpdatePage from "./screens/UserProfileUpdatePage.jsx";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
         <Route index={true} element={<HomePage />} />
         <Route path="poem/:poemId" element={<PoemFullPost />} />
         <Route path="write" element={<WritePoemPage />} />
         <Route path="signin" element={<SignInPage />} />
         <Route path="signup" element={<SignUpPage />} />
         <Route path="profile" element={<SignUpPage />} />

         <Route path="" element={<ProtectedComponent />}>
            <Route path="/account-profile" element={<UserProfilePage />} />
            <Route path="/account-profile/update" element={<UserProfileUpdatePage />} />
            <Route path="/account-profile/account/update" element={<AccountUpdatePage />} />
         </Route>
      </Route>
   )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
