import React from "react";
import NavBaarLink from "./NavBaarLink";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import useAuthentication from "../../hooks/useAuthentication";
import { Outlet } from "react-router-dom";
import styles from "./index.module.css";

export default function NavBar() {
  const { logout, userId } = useAuthentication();

  return (
    <div className={styles.containerNavBar}>
      <nav className={styles.navbar}>
        <h3 className={styles.logo}>CLOCKIN</h3>
        <ul className={styles.navLinks}>
          <li>
            <NavBaarLink to={`/rh/${userId}`}>
              <BsFillBuildingsFill />
              Minha empresa
            </NavBaarLink>
          </li>
          <li>
            <button className={styles.buttonNav} onClick={logout}>
              <FiLogOut /> Logout
            </button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

// export default function NavBar() {
//   const { logout, authenticated, userId } = useAuthentication();

//   return (
//     <div>
//       {authenticated && (
//         <>
//           <NavBaarLink to={`/rh/${userId}`}>
//             <BsFillBuildingsFill />
//             Minha empresa
//           </NavBaarLink>
//           <button onClick={logout}>
//             <FiLogOut /> Logout
//           </button>
//         </>
//       )}
//       {!authenticated && <NavBaarLink to={"/rh/login"}>Login</NavBaarLink>}
//     </div>
//   );
// }
