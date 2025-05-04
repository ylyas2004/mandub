import React, { useState, useEffect } from 'react';
import { Manga, getMangas } from '../services/mangaService';
import { usePlayer } from '../context/PlayerContext';
import './HomePage.css'; // Create this CSS file
import './MangaListPage.css'; // Reuse manga card styles

// Simple component to display a row of manga cards
const MangaRow: React.FC<{ title: string; mangas: Manga[] }> = ({ title, mangas }) => {
  const { setCurrentManga } = usePlayer();

  const handleCardClick = (manga: Manga) => {
    setCurrentManga(manga);
  };

  return (
    <section className="manga-row-section">
      <h2>{title}</h2>
      <div className="manga-row">
        {mangas.map((manga) => (
          <div key={manga.id} className="manga-card home-card" onClick={() => handleCardClick(manga)}>
            <img src={manga.coverUrl} alt={manga.title} className="manga-card-image" />
            <div className="manga-card-info">
              <h3>{manga.title}</h3>
              {/* Optionally hide author on home page cards */}
              {/* <p>{manga.author}</p> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  const [allMangas, setAllMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMangas();
        setAllMangas(data.mangas);
      } catch (err) {
        console.error("Failed to fetch mangas for home page:", err);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Create sample sections (e.g., slice the array)
  // For home page we'll just display two sections with different mangas
  const recentlyAdded = allMangas.slice(0, 5);
  const featured = allMangas.slice(5, 10);

  return (
    <div className="home-page">
      <h1>Welcome to ManDub</h1>
      {/* Add more sections as needed */} 
      <MangaRow title="Recently Added" mangas={recentlyAdded} />
      <MangaRow title="Featured Manga" mangas={featured} />
      {/* Example: Add genres section later */}
    </div>
  );
};

export default HomePage; 