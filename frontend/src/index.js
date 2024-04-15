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
import PoemFullPost from "./screens/PoemFullPost.jsx";
import ProtectedComponent from "./components/UI/ProtectedComponent.jsx";
import PrivateComponent from "./components/UI/PrivateComponent.jsx";
import UserProfilePage from "./screens/UserProfilePage.jsx";
import AccountUpdatePage from "./screens/AccountUpdatePage.jsx";
import UserProfileUpdatePage from "./screens/UserProfileUpdatePage.jsx";
import UserPoemsPage from "./screens/UserPoemsPage.jsx";
import UserPoemsListPage from "./screens/UserPoemsListPage.jsx";
import PoemEditPage from "./screens/PoemEditPage.jsx";
import UserCollectionsPage from "./screens/UserCollectionsPage.jsx";
import CollectionPage from "./screens/CollectionPage.jsx";
import UserFavoritedPoemsPage from "./screens/UserFavoritedPoemsPage.jsx";
import AdminProtectedComponent from "./components/UI/AdminProtectedComponent.jsx";
import UsersListPage from "./screens/admin/UsersListPage.jsx";
import PoemsListPage from "./screens/admin/PoemsListPage.jsx";
import PoemsOfFollowingUsersPage from "./screens/PoemsOfFollowingUsersPage.jsx";
import PoemsForYouPage from "./screens/PoemsForYouPage.jsx";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
         <Route index={true} element={<HomePage />} />
         <Route path="/search/:keyword" element={<HomePage />} />
         <Route path="poem/:poemId" element={<PoemFullPost />} />
         <Route path="write" element={<WritePoemPage />} />
         <Route path="signin" element={<SignInPage />} />
         <Route path="signup" element={<SignUpPage />} />
         <Route path="/user-profile/:userId" element={<UserProfilePage />} />
         <Route path="/user-profile/:userId/poems" element={<UserPoemsPage />} />

         <Route path="" element={<ProtectedComponent />}>
            <Route path="/poems/followings" element={<PoemsOfFollowingUsersPage />} />
            <Route path="/poems/for-you" element={<PoemsForYouPage />} />
            <Route path="/user-profile/account/update" element={<AccountUpdatePage />} />
            <Route
               path="/user-profile/:userId/collections/:collectionId"
               element={<CollectionPage />}
            />
            <Route path="/user-profile/:userId/collections" element={<UserCollectionsPage />} />
            <Route path="/user-profile/:userId/favorites" element={<UserFavoritedPoemsPage />} />
            <Route path="" element={<PrivateComponent />}>
               <Route path="/user-profile/:userId/update" element={<UserProfileUpdatePage />} />
               <Route path="/user-profile/:userId/poems/:status" element={<UserPoemsListPage />} />
               <Route path="/user/:userId/poem/:poemId/edit" element={<PoemEditPage />} />
            </Route>
         </Route>

         <Route path="" element={<AdminProtectedComponent />}>
            <Route path="/users/admin/usersList" element={<UsersListPage />}>
               <Route path="page/:pageNum" element={<UsersListPage />} />
            </Route>
            <Route path="/users/admin/poemsList/" element={<PoemsListPage />}>
               <Route path="page/:pageNum/filter/:filterOption" element={<PoemsListPage />} />
            </Route>
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
