import React, { useState } from 'react';
import {
  FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand
} from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext'; // Import usePlayer
import './MediaPlayer.css';
import { RotateCcw, RotateCw, SkipBack, SkipForward } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MediaPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { currentManga, setIsAutoPlaying, isAutoPlaying } = usePlayer(); // Get current manga from context
  const navigate = useNavigate();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setIsAutoPlaying(!isAutoPlaying);
  };
  
  const toggleMute = () => setIsMuted(!isMuted);
  const handlePrevPage = () => console.log('Prev Page Clicked');
  const handleNextPage = () => console.log('Next Page Clicked');
  const handleSeekBackward = () => console.log('Seek Backward 10s Clicked');
  const handleSeekForward = () => console.log('Seek Forward 10s Clicked');
  
  const handleFullscreen = () => {
    if (currentManga) {
      navigate(`/manga/${currentManga.id}`);
    }
  };

  return (
    <div className={`media-player ${currentManga ? 'visible' : ''}`}>
      {/* Left side: Manga Info */}
      <div className="media-player-info">
        {currentManga ? (
          <>
            <img src={currentManga.coverUrl} alt={currentManga.title} className="player-manga-cover" />
            <div className="player-manga-details">
              <span className="player-manga-title">{currentManga.title}</span>
              {/* Add Chapter info below title later */}
              <span className="player-manga-chapter">Chapter X</span>
            </div>
          </>
        ) : (
          <span>No manga selected</span>
        )}
      </div>

      {/* Center: Controls */}
      <div className="media-player-controls">
        <div className="player-controls-buttons">
          <button className="control-button" onClick={handlePrevPage} title="Previous Page">
            <SkipBack size={16} />
          </button>
          <button className="control-button seek-button" onClick={handleSeekBackward} title="Rewind 10 seconds">
             <RotateCcw size={18} />
          </button>
          <button className="control-button play-pause-button" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button className="control-button seek-button" onClick={handleSeekForward} title="Forward 10 seconds">
            <RotateCw size={18} />
          </button>
          <button className="control-button" onClick={handleNextPage} title="Next Page">
            <SkipForward size={16} />
          </button>
        </div>
        <div className="player-progress">
          <div className="progress-time">00:00</div>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: "30%" }}></div>
              <div className="progress-bar-handle"></div>
            </div>
          </div>
          <div className="progress-time">05:30</div>
        </div>
      </div>

      {/* Right side: Author/Options */}
      <div className="media-player-options">
         {currentManga && (
             <span className="player-manga-author">{currentManga.author}</span>
         )}
         <div className="player-controls-right">
           <button className="control-button" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
             {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
           </button>
           <button className="control-button" onClick={handleFullscreen} title="Go to manga details">
             <FaExpand size={16} />
           </button>
         </div>
      </div>
    </div>
  );
};

export default MediaPlayer; 