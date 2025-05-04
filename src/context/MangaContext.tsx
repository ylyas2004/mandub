import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Manga, MangaChapter } from '../services/mangaService';

interface MangaContextType {
  selectedManga: Manga | null;
  setSelectedManga: (manga: Manga | null) => void;
  selectedChapter: MangaChapter | null;
  setSelectedChapter: (chapter: MangaChapter | null) => void;
  currentPageIndex: number;
  setCurrentPageIndex: (index: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const MangaContext = createContext<MangaContextType | undefined>(undefined);

export const MangaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<MangaChapter | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <MangaContext.Provider 
      value={{ 
        selectedManga, 
        setSelectedManga, 
        selectedChapter, 
        setSelectedChapter,
        currentPageIndex,
        setCurrentPageIndex,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </MangaContext.Provider>
  );
};

export const useManga = () => {
  const context = useContext(MangaContext);
  if (context === undefined) {
    throw new Error('useManga must be used within a MangaProvider');
  }
  return context;
}; 