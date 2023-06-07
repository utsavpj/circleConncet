import { NavLink, Outlet } from "react-router-dom";
import Searchbar from "./Searchbar";
import "../style/Navbar.css";

function Navbar() {
  return (
    <>
      <div className="main-container">
        <div className="header">
          <div className="logo-container">
            <NavLink to="/">
              <img
                src="../assets/logo.png"
                className="logo"
                alt="circleConnect"
              ></img>
            </NavLink>
          </div>

          <div className="searchbar-container">
            <Searchbar />
          </div>

          <div className="profile-container">
            <NavLink
              className={({ isActive }) => (isActive ? "active link" : "link")}
              to="/profile"
            >
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active link" : "link")}
              to="/setting"
            >
              Settings
            </NavLink>
          </div>
        </div>

        <div className="nav-links-container">
          <NavLink
            className={({ isActive }) => (isActive ? "active link" : "link")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active link" : "link")}
            to="/post"
          >
            Post
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active link" : "link")}
            to="/messages"
          >
            Messages
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
