import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../style/Reset.css"
import Logo from './Login-logo';
import { sendPasswordReset } from '../Store/AuthActions';

function Reset() {
    const [email, setEmail] = useState("");
    return (
      <div className="reset">
        <Logo/>
        <h2 className='reset-title'>Reset password</h2>
        <div className="reset_container">
          <input
            type="text"
            className="reset_input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <button
            className="reset_button"
            onClick={() => sendPasswordReset(email)}
          >
            Send password reset email
          </button>
          <p>
            Don't have an account? <Link to="/register">Register now.</Link>
          </p>
        </div>
      </div>
    );
  }
  export default Reset;