import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  // const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('reading');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // Dummy data - would come from API in real app
  const [readingList, setReadingList] = useState<any[]>([]);
  const [completedList, setCompletedList] = useState<any[]>([]);
  const [favoritesList, setFavoritesList] = useState<any[]>([]);

  // Mock profile data
  const [profile, setProfile] = useState({
    displayName: 'Username',
    bio: 'Manga enthusiast and avid reader.',
    avatar: './pic.png', // Placeholder avatar
    joinDate: 'January 2023',
    email: 'user@example.com'
  });

  // Fetch user data
  useEffect(() => {
    // In a real app, this would be an API call
    // For now just mock the data
    const mockReading = [
      { id: '1', title: 'One Piece', coverUrl: 'https://placehold.co/120x160?text=One+Piece', lastRead: '2 hours ago' },
      { id: '2', title: 'Naruto', coverUrl: 'https://placehold.co/120x160?text=Naruto', lastRead: 'Yesterday' },
    ];
    
    const mockCompleted = [
      { id: '3', title: 'Death Note', coverUrl: 'https://placehold.co/120x160?text=Death+Note', completedDate: 'Last week' },
    ];
    
    const mockFavorites = [
      { id: '1', title: 'One Piece', coverUrl: 'https://placehold.co/120x160?text=One+Piece' },
      { id: '4', title: 'Attack on Titan', coverUrl: 'https://placehold.co/120x160?text=AoT' },
    ];
    
    setReadingList(mockReading);
    setCompletedList(mockCompleted);
    setFavoritesList(mockFavorites);
  }, []);

  const handleSaveProfile = () => {
    // In real app, this would update the profile via API
    setIsEditing(false);
  };

  const renderProfileContent = () => {
    if (isEditing) {
      return (
        <div className="profile-edit-form">
          <div className="form-group">
            <label>Display Name</label>
            <input 
              type="text" 
              value={profile.displayName} 
              onChange={(e) => setProfile({...profile, displayName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea 
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
            />
          </div>
          <div className="profile-edit-actions">
            <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSaveProfile}>Save Profile</button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="profile-details">
        <div className="profile-info">
          <p><strong>Member since:</strong> {profile.joinDate}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p className="profile-bio">{profile.bio}</p>
        </div>
        <button 
          className="btn-secondary edit-profile-btn"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      </div>
    );
  };

  const renderMangaList = (list: any[]) => {
    if (list.length === 0) {
      return <p className="empty-list-message">No manga in this list yet.</p>;
    }
    
    return (
      <div className="manga-list-grid">
        {list.map(manga => (
          <div key={manga.id} className="profile-manga-card">
            <img src={manga.coverUrl} alt={manga.title} className="profile-manga-cover" />
            <div className="profile-manga-info">
              <h4>{manga.title}</h4>
              {manga.lastRead && <p>Last read: {manga.lastRead}</p>}
              {manga.completedDate && <p>Completed: {manga.completedDate}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={profile.avatar} alt="User avatar" />
        </div>
        <div className="profile-name-container">
          <h1>{profile.displayName}</h1>
          {renderProfileContent()}
        </div>
      </div>
      
      <div className="profile-tabs">
        <button 
          className={`profile-tab ${activeTab === 'reading' ? 'active' : ''}`}
          onClick={() => setActiveTab('reading')}
        >
          Currently Reading
        </button>
        <button 
          className={`profile-tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button 
          className={`profile-tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
      </div>
      
      <div className="profile-content">
        {activeTab === 'reading' && (
          <div className="reading-list">
            <h2>Currently Reading</h2>
            {renderMangaList(readingList)}
          </div>
        )}
        
        {activeTab === 'completed' && (
          <div className="completed-list">
            <h2>Completed</h2>
            {renderMangaList(completedList)}
          </div>
        )}
        
        {activeTab === 'favorites' && (
          <div className="favorites-list">
            <h2>Favorites</h2>
            {renderMangaList(favoritesList)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 