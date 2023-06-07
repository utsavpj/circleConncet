import React, { useState } from 'react'
import Signup from './Signup';
import '../style/login.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Store/AuthActions';


function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState(''); 
  const [showLogin,setShowLogin] = useState(true);
  const [showSignup,setShowSignup] =useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(email,password))
  } 

  const handleClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  }
  return (
    <>
    {showLogin &&
    <div className='form-container'>   
    
    <form onSubmit={handleLogin}>
    <h1>LOG IN</h1>
    {error && <p>{error}</p>}
    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
    <button className='button' type='submit' disabled={loading}>Login</button>
    <p>New User?</p>
    <a href='#' onClick={handleClick}>Create an account</a>
    </form>
    </div> 
    }
    {showSignup && <Signup/>}
     </>
  )
}

export default Login