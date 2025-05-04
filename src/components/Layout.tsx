import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MediaPlayer from './MediaPlayer';
import './Layout.css'; // We'll create this for styling

type LayoutProps = {
  children: React.ReactNode; // Ensure children prop is typed
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on medium screens
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setIsSidebarCollapsed(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`layout-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''} ${isMobile ? 'mobile-layout' : ''}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="content-wrapper">
        <div className="main-view">
          <TopBar />
          <main className="main-content">
            {/* Top bar/header could go here */} 
            {children}
          </main>
          <MediaPlayer />
        </div>
      </div>
      {/* Future: Add a footer/player equivalent if needed */}
    </div>
  );
};

export default Layout; 