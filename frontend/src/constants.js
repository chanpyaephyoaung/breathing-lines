export const BASE_URL = "";
export const POEMS_URL = "/api/poems";
export const USERS_URL = "/api/users";
export const ADMIN_USER_BASE_URL = "/api/poems";
export const UPLOAD_URL = "/api/upload";

export const USER_PROFILE_SUB_MENU_LINKS = [
   {
      activeNavIdentifier: "account-profile",
      activeNavPathIdentifier: "",
      activeNavLabel: "Overview",
   },
   {
      activeNavIdentifier: "poems",
      activeNavPathIdentifier: "/poems",
      activeNavLabel: "Poems",
   },
   {
      activeNavIdentifier: "collections",
      activeNavPathIdentifier: "/collections",
      activeNavLabel: "Collections",
   },
   {
      activeNavIdentifier: "favorites",
      activeNavPathIdentifier: "/favorites",
      activeNavLabel: "Favorites",
   },
];

export const POEM_WRITE_STATUS_DISCARD = "discarded";
export const POEM_WRITE_STATUS_DRAFT = "drafted";
export const POEM_WRITE_STATUS_PUBLISH = "published";

export const bgThemes = [
   {
      id: 1,
      name: "None",
      path: "",
   },
   {
      id: 2,
      name: "Contour Line",
      path: "/images/bg-themes/contour-line.svg",
   },
   {
      id: 3,
      name: "Curve Line",
      path: "/images/bg-themes/curve-line.svg",
   },
   {
      id: 4,
      name: "Mass Circles",
      path: "/images/bg-themes/mass-circles.svg",
   },
   {
      id: 5,
      name: "Snow",
      path: "/images/bg-themes/snow.svg",
   },
   {
      id: 6,
      name: "Sprinkle",
      path: "/images/bg-themes/sprinkle.svg",
   },
];
