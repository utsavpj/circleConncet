import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../style/login.css"
import { sendPasswordReset } from '../Store/AuthActions';

function Reset() {
    const [email, setEmail] = useState("");
    return (
      <div className="reset">
        <div className="reset__container">
          <input
            type="text"
            className="reset__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <button
            className="reset__btn"
            onClick={() => sendPasswordReset(email)}
          >
            Send password reset email
          </button>
          <a href='#'>
            Don't have an account? <Link to="/register">Register now.</Link>
          </a>
        </div>
      </div>
    );
  }
  export default Reset;