import React from "react";
import NavBaarLink from "./NavBaarLink";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import useAuthentication from "../../hooks/useAuthentication";

export default function NavBar() {
  const { logout, authenticated, userId } = useAuthentication();

  return (
    <div>
      {authenticated && (
        <>
          <NavBaarLink to={`/rh/${userId}`}>
            <BsFillBuildingsFill />
            Minha empresa
          </NavBaarLink>
          <button onClick={logout}>
            <FiLogOut /> Logout
          </button>
        </>
      )}
      {!authenticated && <NavBaarLink to={"/rh/login"}></NavBaarLink>}
    </div>
  );
}
