import { NavLink, Outlet } from "react-router-dom";
import Searchbar from "./Searchbar";
import "../style/Navbar.css";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from '../Store/AuthActions';
import { useDispatch} from "react-redux";

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <>
      <div className="main-container">
        <div className="header">
          <div className="logo-container">
            <NavLink to="/">
              <img
                src="/assets/logo.png"
                className="logo"
                alt="circleConnect"
              ></img>
            </NavLink>
          </div>

          <div className="searchbar-container">
            <Searchbar />
          </div>

          <div className="profile-container">
          <Dropdown>
          <Dropdown.Toggle className="custom-dropdown-toggle" variant="success">
            Profile
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">
            <NavLink className={({ isActive }) => (isActive ? "active profile-link" : "profile-link")} to="/profile">Profile</NavLink>                
            </Dropdown.Item>
            <Dropdown.Item href="#">
            <NavLink className={({ isActive }) => (isActive ? "active profile-link" : "profile-link")} to="/setting">Settings</NavLink>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} className={({ isActive }) => (isActive ? "active profile-link" : "profile-link")}>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>

        <div className="nav-links-container">
          <NavLink
            className={({ isActive }) => (isActive ? "active link" : "link")}
            to="/"
          >
            Feed
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
