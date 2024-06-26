import { Link } from "react-router-dom";
import { USER_PROFILE_SUB_MENU_LINKS } from "../../constants";

const UserProfileSubMenu = ({ activeNav, userId }) => {
   return (
      <ul className="flex list-none font-regular text-sm md:text-base [&>li:not(:first-child)]:border-l [&>li:not(:first-child)]:border-clr-black">
         {USER_PROFILE_SUB_MENU_LINKS.map((nav) => (
            <li key={nav.activeNavIdentifier} className="px-2 md:px-4">
               <Link
                  to={`/user-profile/${userId}${nav.activeNavPathIdentifier}`}
                  data-testid={nav.activeNavIdentifier}
                  className={
                     activeNav === nav.activeNavPathIdentifier
                        ? "text-clr-primary underline"
                        : "transition-all hover:text-clr-primary hover:underline"
                  }
               >
                  {nav.activeNavLabel}
               </Link>
            </li>
         ))}
      </ul>
   );
};
export default UserProfileSubMenu;
