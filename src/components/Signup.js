import React, { useState } from "react";
import '../style/login.css'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Store/AuthActions";
import Login from "./Login";
import Logo from "./Login-logo";
import { useNavigate } from "react-router-dom";

function Signup() {
  const[username,setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [showLogin,setShowLogin] = useState(false)
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const handleSignup = (event) => {
    event.preventDefault();
    dispatch(register(email, password,username,name,dob,selectedPhoto)).then(() => {
      navigate("/")
      console.log("dispatch");
    });
    
    setEmail('')
    setPassword('')
    setDob('')
    setUsername('')
    setName('')
  };

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate("/")
  }

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedPhoto(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>{!showLogin &&
      <div className="form-container">
     
      <form onSubmit={handleSignup}>
      <div className="logo-container">
      <Logo/>
      </div>
      <h2>CREATE AN ACCOUNT</h2>
      
        <div className="profile-image">
      {selectedPhoto ? (
        <img
          className="img"
          src={selectedPhoto}
          alt="Selected"
        />
      ) : (
        
        <label htmlFor="upload-input" style={{ cursor: 'pointer' }}>
          <img
            src="/assets/upload-photo.png"
            alt="Upload"
            className="img upload"
          />
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          {!selectedPhoto && <p className="title">Upload a profile picture</p>}
        </label>
      )}
    </div>
        <input
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button className='button' type="submit" disabled={loading}>Signup</button>
        <p className="goback" onClick={handleGoBack}><i class="fa-solid fa-arrow-left"></i>  Back to Log In</p>
      </form>
      {error && <p className="error-msg">{error}</p>}
      </div>
      
    }
    {showLogin && <Login/>}
    </>
  );
}

export default Signup;
