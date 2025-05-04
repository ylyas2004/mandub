import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Manga, MangaChapter, getMangaById, getChapterById } from '../services/mangaService';
import { Maximize2, Minimize2, ChevronLeft, ChevronRight, Menu, X, Play, Pause } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import './MangaDetailPage.css';

const MangaDetailPage: React.FC = () => {
  const { mangaId } = useParams<{ mangaId: string }>();
  const [manga, setManga] = useState<Manga | null>(null);
  const [currentChapter, setCurrentChapter] = useState<MangaChapter | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [chapterLoading, setChapterLoading] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showPageSidebar, setShowPageSidebar] = useState<boolean>(false);
  const { currentManga, setCurrentManga, isAutoPlaying, setIsAutoPlaying } = usePlayer();
  
  // Auto-play timer
  const [autoplayTimer, setAutoplayTimer] = useState<number | null>(null);

  // Setup auto-play functionality
  useEffect(() => {
    console.log(currentManga);
    if (isAutoPlaying && currentChapter) {
      const timer = setTimeout(() => {
        if (currentPageIndex < currentChapter.pages.length - 1) {
          handleNextPage();
        } else {
          // Auto-stop at the end of chapter
          setIsAutoPlaying(false);
        }
      }, 5000); // 5 seconds per page
      setAutoplayTimer(timer);
    } else if (autoplayTimer) {
      clearTimeout(autoplayTimer);
      setAutoplayTimer(null);
    }

    return () => {
      if (autoplayTimer) {
        clearTimeout(autoplayTimer);
      }
    };
  }, [isAutoPlaying, currentPageIndex, currentChapter]);

  useEffect(() => {
    const fetchManga = async () => {
      if (!mangaId) return;

      setLoading(true);
      try {
        const result = await getMangaById(mangaId);
        if (result) {
          setManga(result);
          setCurrentManga(result); // Set current manga in player context
          // If manga has chapters, select the first one by default
          if (result.chapters && result.chapters.length > 0) {
            await loadChapter(result.chapters[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching manga:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchManga();

    // Handle escape key for exiting fullscreen
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    // Add keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!currentChapter) return;

      if (event.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (event.key === 'ArrowRight') {
        handleNextPage();
      } else if (event.key === ' ') {
        // Space bar toggles autoplay
        toggleAutoPlay();
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mangaId, isFullscreen, currentChapter]);

  const loadChapter = async (chapterId: string) => {
    if (!mangaId) return;

    setChapterLoading(true);
    try {
      const chapter = await getChapterById(mangaId, chapterId);
      if (chapter) {
        setCurrentChapter(chapter);
        setCurrentPageIndex(0); // Reset to first page
      }
    } catch (error) {
      console.error('Error fetching chapter:', error);
    } finally {
      setChapterLoading(false);
    }
  };

  const handleChapterSelect = async (chapterId: string) => {
    await loadChapter(chapterId);
  };

  const handlePageChange = (newIndex: number) => {
    if (!currentChapter || newIndex < 0 || newIndex >= currentChapter.pages.length) return;
    setCurrentPageIndex(newIndex);
  };

  const handlePrevPage = () => {
    handlePageChange(currentPageIndex - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPageIndex + 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const togglePageSidebar = () => {
    setShowPageSidebar(!showPageSidebar);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!manga) {
    return <div className="not-found">Manga not found</div>;
  }

  const renderPageSidebar = () => {
    if (!currentChapter || !showPageSidebar) return null;

    return (
      <div className="pages-sidebar">
        <div className="pages-sidebar-header">
          <h3>Pages</h3>
          <button className="icon-button" onClick={togglePageSidebar}>
            <X size={18} />
          </button>
        </div>
        <div className="pages-list">
          {currentChapter.pages.map((page, index) => (
            <div
              key={index}
              className={`page-item ${currentPageIndex === index ? 'active' : ''}`}
              onClick={() => handlePageChange(index)}
            >
              <div className="page-thumbnail">
                <img src={page.imageUrl} alt={`Page ${index + 1} thumbnail`} />
              </div>
              <span>Page {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`manga-detail-page ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      {!isFullscreen && (
        <div className="manga-header">
          <div className="manga-cover">
            <img src={manga.coverUrl} alt={manga.title} />
          </div>
          <div className="manga-info">
            <h1>{manga.title}</h1>
            <p className="manga-author">by {manga.author}</p>
            <div className="manga-genres">
              {manga.genres.map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>
            <p className="manga-description">{manga.description}</p>
          </div>
        </div>
      )}

      <div className={`manga-reader-container ${isFullscreen ? 'fullscreen' : ''}`}>
        {!isFullscreen && (
          <div className="chapter-list">
            <h3>Chapters</h3>
            <div className="chapter-list-scroll">
              {manga.chapters?.map(chapter => (
                <button
                  key={chapter.id}
                  className={`chapter-button ${currentChapter?.id === chapter.id ? 'active' : ''}`}
                  onClick={() => handleChapterSelect(chapter.id)}
                >
                  {chapter.title} <span className="chapter-date">{chapter.releaseDate}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={`manga-reader ${showPageSidebar ? 'with-sidebar' : ''}`}>
          {chapterLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : currentChapter ? (
            <div className="manga-page-container">
              <div className="manga-reader-header">
                <h3>{currentChapter.title}</h3>
                <div className="reader-controls">
                  <button className="icon-button" onClick={toggleAutoPlay} title={isAutoPlaying ? "Pause auto-play" : "Play chapter"}>
                    {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button className="icon-button" onClick={togglePageSidebar} title="Show pages">
                    <Menu size={18} />
                  </button>
                  <button className="icon-button" onClick={toggleFullscreen} title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}>
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                </div>
              </div>

              <div className="manga-page">
                {currentChapter.pages[currentPageIndex] && (
                  <img
                    src={currentChapter.pages[currentPageIndex].imageUrl}
                    alt={`Page ${currentPageIndex + 1}`}
                    className="manga-page-image"
                  />
                )}
                <button
                  className="page-nav-button prev-button"
                  onClick={handlePrevPage}
                  disabled={currentPageIndex === 0}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="page-nav-button next-button"
                  onClick={handleNextPage}
                  disabled={currentPageIndex === currentChapter.pages.length - 1}
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="page-controls">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPageIndex === 0}
                  className="page-control-button"
                >
                  Previous
                </button>

                <span className="page-info">
                  <span className="current-page">{currentPageIndex + 1}</span>
                  <span className="page-separator">/</span>
                  <span className="total-pages">{currentChapter.pages.length}</span>
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPageIndex === currentChapter.pages.length - 1}
                  className="page-control-button"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="select-chapter-message">
              Select a chapter to start reading
            </div>
          )}

          {renderPageSidebar()}
        </div>
      </div>
    </div>
  );
};

export default MangaDetailPage; 