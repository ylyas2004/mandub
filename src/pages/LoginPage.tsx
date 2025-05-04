import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import './AuthPage.css'; // Shared CSS file

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add actual login logic here
    console.log('Logging in...');
    login(); // Use mock login
    navigate('/'); // Redirect to home after login
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">ManDub</div>
        <h1>Log in to continue</h1>
        
        <div className="social-auth-buttons">
          <button className="social-button" title="Continue with Google">
            <FaGoogle size={20} />
          </button>
          <button className="social-button" title="Continue with Facebook">
            <FaFacebook size={20} />
          </button>
          <button className="social-button" title="Continue with Apple">
            <FaApple size={20} />
          </button>
        </div>
        
        <div className="auth-divider"></div>
        
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email or username</label>
            <input type="text" id="email" placeholder="Email or username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" required />
          </div>
          <button type="submit" className="btn-primary auth-button">Log In</button>
        </form>
        
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign up for MangaDub</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 