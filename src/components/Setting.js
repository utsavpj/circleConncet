import React, { useEffect, useState } from "react";
import "../style/setting.css";
import { getUsers, updateUser } from "../Store/AuthActions";
import { auth } from "../Firebase";
import { current } from "@reduxjs/toolkit";

function Setting() {
  const [editMode, setEditMode] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("johndoe");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [newpassword, setNewPassword] = useState("");
  const [currentpassword, setCurrentPassword] = useState("");
  const [dob, setDob] = useState("1990-01-01");
  const [profilePicture, setProfilePicture] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const currentUserID = auth.currentUser.uid;

  const handleEditClick = () => {
    setEditMode(true);
  };

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedPhoto(e.target.result);
      setProfilePicture(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers(currentUserID);
        setUser(userData);
        setName(userData.name);
        setUsername(userData.username);
        setEmail(userData.email);
        setCurrentPassword(userData.password);
        setNewPassword("");
        setDob(userData.dob);
        setProfilePicture(userData.profilePic);
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };

    fetchUsers();
  }, [currentUserID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update user information with the entered values
      await updateUser(
        currentUserID,
        name,
        username,
        currentpassword,
        newpassword,
        dob,
        email,
        profilePicture
      );
      console.log("User information updated successfully.");

      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      alert("Error while updating data");
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <div className="setting-container">
        <div className="settings">
          <form onSubmit={handleSubmit}>
            <div className="setting-profile-picture">
              {selectedPhoto ? (
                <img
                  className="setting-img"
                  src={selectedPhoto}
                  alt="Selected"
                />
              ) : (
                <label htmlFor="upload-input" style={{ cursor: "pointer" }}>
                  <img
                    src={profilePicture}
                    alt="Upload"
                    className="setting-img"
                  />
                  <input
                    id="upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                    disabled={!editMode}
                  />
                </label>
              )}
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label>Current Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={currentpassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={true}
              />
              <span
              className="view-password-icon"
              onClick={toggleShowPassword}
              role="button"
            >
              <i
                className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
              ></i>
              </span>
            </div>
            <div className="form-group">
              <label>New Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={!editMode}
              ></input>
              <span
                className="view-password-icon"
                onClick={toggleShowPassword}
                role="button"
              >
                <i
                  className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                ></i>
              </span>
            </div>
            <div className="form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={!editMode}
                readOnly={!editMode}
              />
            </div>
            {editMode ? (
              <button type="submit">Save Changes</button>
            ) : (
              <button type="button" onClick={handleEditClick}>
                Edit
              </button>
            )}
          </form>
          {updateSuccess && (
            <div className="success-message">
              User information updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Setting;
