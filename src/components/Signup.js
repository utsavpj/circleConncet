import React, { useState } from "react";
import '../style/login.css'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Store/AuthActions";

function Signup() {
  const[username,setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const handleSignup = (event) => {
    event.preventDefault();
    dispatch(register(email, password));
    
  };
  return (
    <>
      <div className="form-container">
      <form onSubmit={handleSignup}>
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
      </form>
      </div>
    </>
  );
}

export default Signup;
