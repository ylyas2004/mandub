import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Manga } from '../services/mangaService'; // Import the Manga type

interface PlayerContextType {
  currentManga: Manga | null;
  setCurrentManga: (manga: Manga | null) => void;
  isAutoPlaying: boolean;
  setIsAutoPlaying: (isPlaying: boolean) => void;
  // Add playback state later (isPlaying, currentPage, etc.)
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentManga, setCurrentManga] = useState<Manga | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  return (
    <PlayerContext.Provider value={{ 
      currentManga, 
      setCurrentManga,
      isAutoPlaying,
      setIsAutoPlaying
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}; 