import React, { useState } from "react";
import '../style/login.css'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Store/AuthActions";
import Login from "./Login";
import Logo from "./Login-logo";

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
  const handleSignup = (event) => {
    event.preventDefault();
    dispatch(register(email, password,username,name,dob));
    
    setEmail('')
    setPassword('')
    setDob('')
    setUsername('')
    setName('')
  };

  const handleGoBack = (event) => {
    event.preventDefault();
    setShowLogin(true);
  }
  return (
    <>{!showLogin &&
      <div className="form-container">
     
      <form onSubmit={handleSignup}>
      <div className="logo-container">
      <Logo/>
      </div>
      <h2>CREATE AN ACCOUNT</h2>
      {error && <p>{error}</p>}
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
      
      </div>
    }
    {showLogin && <Login/>}
    </>
  );
}

export default Signup;
