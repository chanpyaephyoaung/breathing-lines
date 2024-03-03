export const BASE_URL = "";
export const POEMS_URL = "/api/poems";
export const USERS_URL = "/api/users";
export const ADMIN_USER_BASE_URL = "/api/poems";
export const UPLOAD_URL = "/api/upload";

export const USER_PROFILE_SUB_MENU_LINKS = [
   {
      activeNavIdentifier: "account-profile",
      activeNavPath: "/account-profile",
      activeNavLabel: "Overview",
   },
   {
      activeNavIdentifier: "poems",
      activeNavPath: "/poems",
      activeNavLabel: "Poems",
   },
   {
      activeNavIdentifier: "collections",
      activeNavPath: "/collections",
      activeNavLabel: "Collections",
   },
   {
      activeNavIdentifier: "favorites",
      activeNavPath: "/favorites",
      activeNavLabel: "Favorites",
   },
];

export const POEM_WRITE_STATUS_DISCARD = "Discard";
export const POEM_WRITE_STATUS_DRAFT = "Draft";
export const POEM_WRITE_STATUS_PUBLISH = "Publish";
