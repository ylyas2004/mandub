import { useState } from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('account');

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <ul>
            <li 
              className={activeSection === 'account' ? 'active' : ''}
              onClick={() => setActiveSection('account')}
            >
              Account
            </li>
            <li 
              className={activeSection === 'media' ? 'active' : ''}
              onClick={() => setActiveSection('media')}
            >
              Media Player
            </li>
            <li 
              className={activeSection === 'manga' ? 'active' : ''}
              onClick={() => setActiveSection('manga')}
            >
              Manga
            </li>
            <li 
              className={activeSection === 'search' ? 'active' : ''}
              onClick={() => setActiveSection('search')}
            >
              Search
            </li>
            <li 
              className={activeSection === 'appearance' ? 'active' : ''}
              onClick={() => setActiveSection('appearance')}
            >
              Appearance
            </li>
            <li 
              className={activeSection === 'notifications' ? 'active' : ''}
              onClick={() => setActiveSection('notifications')}
            >
              Notifications
            </li>
          </ul>
        </div>
        
        <div className="settings-content">
          {activeSection === 'account' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              <div className="setting-item">
                <h3>Profile Information</h3>
                <p>Update your profile details and preferences</p>
                <button className="settings-button">Edit Profile</button>
              </div>
              <div className="setting-item">
                <h3>Password</h3>
                <p>Change your password</p>
                <button className="settings-button">Change Password</button>
              </div>
              <div className="setting-item">
                <h3>Connected Accounts</h3>
                <p>Manage your connected social accounts</p>
                <button className="settings-button">Manage Connections</button>
              </div>
            </div>
          )}
          
          {activeSection === 'media' && (
            <div className="settings-section">
              <h2>Media Player Settings</h2>
              <div className="setting-item">
                <h3>Playback Speed</h3>
                <p>Set your default playback speed</p>
                <select className="settings-select">
                  <option value="0.5">0.5x</option>
                  <option value="0.75">0.75x</option>
                  <option value="1" selected>1x (Normal)</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </select>
              </div>
              <div className="setting-item">
                <h3>Auto-Play</h3>
                <p>Automatically play next episode</p>
                <div className="toggle-switch">
                  <input type="checkbox" id="autoplay" />
                  <label htmlFor="autoplay"></label>
                </div>
              </div>
              <div className="setting-item">
                <h3>Quality</h3>
                <p>Choose your default video quality</p>
                <select className="settings-select">
                  <option value="auto" selected>Auto</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          )}
          
          {activeSection === 'manga' && (
            <div className="settings-section">
              <h2>Manga Settings</h2>
              <div className="setting-item">
                <h3>Reading Direction</h3>
                <p>Choose your preferred reading direction</p>
                <select className="settings-select">
                  <option value="rtl" selected>Right to Left</option>
                  <option value="ltr">Left to Right</option>
                </select>
              </div>
              <div className="setting-item">
                <h3>Reading Mode</h3>
                <p>Set your preferred reading mode</p>
                <select className="settings-select">
                  <option value="paged" selected>Paged</option>
                  <option value="continuous">Continuous Scroll</option>
                </select>
              </div>
              <div className="setting-item">
                <h3>Page Preloading</h3>
                <p>Preload pages for smoother reading</p>
                <div className="toggle-switch">
                  <input type="checkbox" id="preload" checked />
                  <label htmlFor="preload"></label>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'search' && (
            <div className="settings-section">
              <h2>Search Settings</h2>
              <div className="setting-item">
                <h3>Search History</h3>
                <p>Save your search history</p>
                <div className="toggle-switch">
                  <input type="checkbox" id="search-history" checked />
                  <label htmlFor="search-history"></label>
                </div>
              </div>
              <div className="setting-item">
                <h3>Search Filters</h3>
                <p>Default filters for search results</p>
                <div className="checkbox-group">
                  <div className="checkbox-item">
                    <input type="checkbox" id="filter-manga" checked />
                    <label htmlFor="filter-manga">Manga</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="filter-characters" checked />
                    <label htmlFor="filter-characters">Characters</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="filter-authors" checked />
                    <label htmlFor="filter-authors">Authors</label>
                  </div>
                </div>
              </div>
              <div className="setting-item">
                <h3>Clear Search History</h3>
                <p>Remove all saved searches</p>
                <button className="settings-button">Clear History</button>
              </div>
            </div>
          )}
          
          {activeSection === 'appearance' && (
            <div className="settings-section">
              <h2>Appearance Settings</h2>
              <div className="setting-item">
                <h3>Theme</h3>
                <p>Choose your preferred theme</p>
                <select className="settings-select">
                  <option value="dark" selected>Dark</option>
                  <option value="light">Light</option>
                  <option value="system">System Default</option>
                </select>
              </div>
              <div className="setting-item">
                <h3>Font Size</h3>
                <p>Adjust text size throughout the app</p>
                <select className="settings-select">
                  <option value="small">Small</option>
                  <option value="medium" selected>Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          )}
          
          {activeSection === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              <div className="setting-item">
                <h3>Push Notifications</h3>
                <p>Receive notifications for important updates</p>
                <div className="toggle-switch">
                  <input type="checkbox" id="push-notifications" checked />
                  <label htmlFor="push-notifications"></label>
                </div>
              </div>
              <div className="setting-item">
                <h3>Email Notifications</h3>
                <p>Receive email updates</p>
                <div className="toggle-switch">
                  <input type="checkbox" id="email-notifications" checked />
                  <label htmlFor="email-notifications"></label>
                </div>
              </div>
              <div className="setting-item">
                <h3>New Release Alerts</h3>
                <p>Get notified about new manga chapters</p>
                <div className="toggle-switch">
                  <input type="checkbox" id="release-notifications" checked />
                  <label htmlFor="release-notifications"></label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 