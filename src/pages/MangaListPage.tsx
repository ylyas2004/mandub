import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Manga, getMangas } from '../services/mangaService';
import { Search, Filter, X } from 'lucide-react';
import './MangaListPage.css';

const MangaListPage: React.FC = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalMangas, setTotalMangas] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const mangasPerPage = 8;
  const totalPages = Math.ceil(totalMangas / mangasPerPage);

  useEffect(() => {
    fetchMangas(currentPage);
  }, [currentPage, searchQuery, selectedGenres]);

  const fetchMangas = async (page: number) => {
    setLoading(true);
    try {
      // In a real app, you would pass the search query and filters to the API
      const result = await getMangas(page, mangasPerPage, searchQuery, selectedGenres);
      setMangas(result.mangas);
      setTotalMangas(result.total);
    } catch (error) {
      console.error('Error fetching mangas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleGenreSelect = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pages = [];
    const maxButtons = 5; // Max number of buttons to show
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Adjust startPage if endPage is at max
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &laquo; Prev
      </button>
    );

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next &raquo;
      </button>
    );

    return <div className="pagination">{pages}</div>;
  };

  // Available genres for the filter panel
  const allGenres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life',
    'Sports', 'Thriller', 'Historical', 'Supernatural'
  ];

  return (
    <div className="manga-list-page">
      <div className="manga-list-header">
        <h1>Manga Library</h1>
        
        {/* Search and filter bar */}
        <div className="search-filter-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search manga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="clear-search-btn" 
                  onClick={() => setSearchQuery('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button 
              type="button" 
              className={`filter-button ${showFilters ? 'active' : ''}`} 
              onClick={toggleFilters}
            >
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </form>
          
          {/* Filter panel */}
          {showFilters && (
            <div className="filter-panel">
              <div className="filter-header">
                <h3>Filter by genre</h3>
                <button onClick={clearFilters} className="clear-filters-btn">Clear All</button>
              </div>
              <div className="genre-filters">
                {allGenres.map(genre => (
                  <label key={genre} className="genre-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreSelect(genre)}
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top pagination */}
      <div className="top-pagination-container">
        {!loading && renderPagination()}
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : mangas.length > 0 ? (
        <div className="manga-grid">
          {mangas.map((manga) => (
            <Link to={`/manga/${manga.id}`} key={manga.id} className="manga-card">
              <img
                src={manga.coverUrl}
                alt={manga.title}
                className="manga-card-image"
              />
              <div className="manga-card-info">
                <h3>{manga.title}</h3>
                <p className="manga-author">{manga.author}</p>
                <div className="manga-genres">
                  {manga.genres.slice(0, 2).map((genre, index) => (
                    <span key={index} className="manga-genre-tag">{genre}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No manga found matching your criteria.</p>
          <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
        </div>
      )}

      {/* Bottom pagination */}
      <div className="bottom-pagination-container">
        {!loading && renderPagination()}
      </div>
    </div>
  );
};

export default MangaListPage; 