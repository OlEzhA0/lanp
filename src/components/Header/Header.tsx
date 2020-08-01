import React, { useContext } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { AuthContext } from "../../context/authContext";

export const Header = () => {
  const { userInfo } = useContext(AppContext);
  const { logout } = useContext(AuthContext);

  return (
    <div className="Header">
      <nav>
        <ul className="Header__NavList">
          <li className="Header__Item">
            <NavLink
              to="/collection"
              activeClassName="Header__Link--active"
              className="Header__Link"
            >
              My collection
            </NavLink>
          </li>
          <li className="Header__Item">
            <NavLink
              to="/new"
              activeClassName="Header__Link--active"
              className="Header__Link"
            >
              Load new
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="Header__Settings">
        <p>{userInfo.name || "Загрузка.."}</p>
        <button type="button" className="Header__Logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
