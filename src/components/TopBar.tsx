import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './TopBar.css';

const TopBar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth(); // Use logout for demo

  // Temporary login simulation button (remove in real app)
  const { login } = useAuth();
  const handleTempLogin = () => login();

  return (
    <div className="top-bar">
      {/* Add navigation arrows (prev/next history) here later if needed */}
      <div className="top-bar-spacer"></div> {/* Pushes items to the right */}

      {/* TEMP: Login Button for Demo */}

      {/* End TEMP */}

      {isLoggedIn ? (
        <div className="user-profile">
          <Link to="/profile" className="profile-link">
            <FaUserCircle size={28} />
            {/* Add username here later */}
          </Link>
          {/* Add a dropdown for logout, settings etc. later */}
          <button onClick={logout} className="btn-secondary logout-btn">Logout</button>
        </div>
      ) : (
        <div className="auth-buttons">
          {!isLoggedIn && (
            <button onClick={handleTempLogin} className="btn-secondary">
              Temp Login
            </button>
          )}
          <Link to="/register" className="btn-secondary">Sign up</Link>
          <Link to="/login" className="btn-primary login-btn">Log in</Link>
        </div>
      )}
    </div>
  );
};

export default TopBar; 