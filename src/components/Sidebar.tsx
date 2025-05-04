import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    FaHome, FaSearch, FaUser, FaAngleLeft, FaAngleRight,
    FaCreditCard, FaCog, FaBars, FaTimes
} from 'react-icons/fa';
import './Sidebar.css';

// Define props type
interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Close drawer when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  };

  const renderSidebar = () => (
    <aside className={`sidebar ${isCollapsed && !isMobile ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''} ${isDrawerOpen ? 'drawer-open' : ''}`}>
      <div className="sidebar-header">
        {(!isCollapsed || isMobile) && (
          <div className="sidebar-logo">
            <Link to="/">ManDub</Link>
          </div>
        )}
        {/* Toggle Button - Don't show in mobile drawer mode */}
        {!isMobile && (
          <button onClick={toggleSidebar} className="sidebar-toggle-btn" title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
            {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
        )}
        {/* Close drawer button for mobile */}
        {isMobile && (
          <button onClick={handleToggleDrawer} className="drawer-close-btn">
            <FaTimes />
          </button>
        )}
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={isMobile ? handleToggleDrawer : undefined}>
              <FaHome /> {(!isCollapsed || isMobile) && <span>Home</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/manga" className={({ isActive }) => isActive ? 'active' : ''} onClick={isMobile ? handleToggleDrawer : undefined}>
              <FaSearch /> {(!isCollapsed || isMobile) && <span>Search</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''} onClick={isMobile ? handleToggleDrawer : undefined}>
              <FaUser /> {(!isCollapsed || isMobile) && <span>Profile</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/subscription" className={({ isActive }) => isActive ? 'active' : ''} onClick={isMobile ? handleToggleDrawer : undefined}>
              <FaCreditCard /> {(!isCollapsed || isMobile) && <span>Subscription</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
      
      {/* Settings link at bottom */}
      <div className="sidebar-footer">
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''} onClick={isMobile ? handleToggleDrawer : undefined}>
          <FaCog /> {(!isCollapsed || isMobile) && <span>Settings</span>}
        </NavLink>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile toggle button in TopBar */}
      {isMobile && (
        <button className="mobile-sidebar-toggle" onClick={handleToggleDrawer}>
          <FaBars size={18} />
        </button>
      )}
      
      {/* Render sidebar */}
      {renderSidebar()}
      
      {/* Overlay for mobile drawer */}
      {isMobile && isDrawerOpen && (
        <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
      )}
    </>
  );
};

export default Sidebar; 