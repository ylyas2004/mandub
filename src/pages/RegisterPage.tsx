import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // To log in after register
import './AuthPage.css'; // Shared CSS file

const RegisterPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Add actual registration logic here
    console.log('Registering...');
    // For demo, directly log in after register
    login(); 
    navigate('/'); // Redirect to home
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">MangaDub</div>
        <h1>Join the manga revolution</h1>        
        <div className="auth-divider1"></div>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">What's your email?</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Create a password</label>
            <input type="password" id="password" placeholder="Create a password" required />
          </div>
           <div className="form-group">
            <label htmlFor="display-name">What should we call you?</label>
            <input type="text" id="display-name" placeholder="Enter a profile name" required />
          </div>
           
          <button type="submit" className="btn-primary auth-button">Sign Up</button>
        </form>
        
        {/* <p className="auth-terms">
          By clicking on sign-up, you agree to MangaDub's <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
        </p> */}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 