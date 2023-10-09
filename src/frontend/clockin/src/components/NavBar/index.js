import React from "react";
import { useUser } from "../../context/User";
import NavBaarLink from "./NavBaarLink";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/UserService";

export default function NavBar() {
  const navigate = useNavigate();
  const { userId, setUserId } = useUser();
  const logout = async () => {
    await logoutUser();
    setUserId("");
    navigate("/rh/login");
  };
  return (
    <div>
      <NavBaarLink to={"/"}>Home</NavBaarLink>
      {userId && (
        <>
          <NavBaarLink to={`/rh/${userId}`}>Minha empresa</NavBaarLink>
          <button onClick={logout}>Logout</button>
        </>
      )}
      {!userId && <NavBaarLink to={"/rh/login"}>Login</NavBaarLink>}
    </div>
  );
}
