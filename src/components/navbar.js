import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import "../style/Navbar.css";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { getUsers, logout } from '../Store/AuthActions';
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import { auth } from "../Firebase";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUsers] = useState({});
  const currentUserID = auth.currentUser.uid

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers(currentUserID);
        setUsers(userData);
      } catch (error) {
        console.error('Error getting user:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/")
    })
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
            Hello there, {user.username}!
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">
            <NavLink className={({ isActive }) => (isActive ? "active profile-link" : "profile-link")} to="/profile">PROFILE</NavLink>                
            </Dropdown.Item>
            <Dropdown.Item href="#">
            <NavLink className={({ isActive }) => (isActive ? "active profile-link" : "profile-link")} to="/setting">SETTINGS</NavLink>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} className={({ isActive }) => (isActive ? "active profile-link" : "profile-link")}>
              LOG OUT <i class="fa-solid fa-right-from-bracket"></i>
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
            HOME
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active link" : "link")}
            to="/post"
          >
            POST
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active link" : "link")}
            to="/messages"
          >
            MESSAGES
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
