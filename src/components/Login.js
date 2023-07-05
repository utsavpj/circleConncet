import React, { useState } from 'react'
import '../style/login.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Store/AuthActions';
import Logo from './Login-logo';
import { Link , useHistory, useNavigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState(''); 
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(email,password)).then(()=>{
      navigate('/')
    })

  } 

  return (
    <>
    <div className='form-container'>   
    <form onSubmit={handleLogin}>
    <div className="logo-container">
    <Logo/>
    </div>
    <h1>LOG IN</h1>
    
    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
    <button className='button' type='submit' disabled={loading}>LOGIN</button>
    <p>New User?</p>
    <Link to="/register">Register</Link>
    <Link to="/reset">Forgot password?</Link>
    </form>
    {error && <p className="error-msg">{error}</p>}
    </div> 
     </>
  )
}

export default Login