export interface MangaPage {
  id: string;
  imageUrl: string;
  pageNumber: number;
}

export interface MangaChapter {
  id: string;
  title: string;
  releaseDate: string;
  pages: MangaPage[];
}

export interface Manga {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  genres: string[];
  chapters?: MangaChapter[];
}

// Mock data
const MOCK_MANGAS: Manga[] = [
  {
    id: '1',
    title: 'Attack on Titan',
    author: 'Hajime Isayama',
    description: 'In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager vows to exterminate them after a Titan brings about the destruction of his hometown and the death of his mother.',
    coverUrl: './manga_attackontitan.jpg',
    genres: ['Action', 'Drama', 'Fantasy', 'Horror'],
    chapters: generateMockChapters('Attack on Titan', 5),
  },
  {
    id: '2',
    title: 'One Piece',
    author: 'Eiichiro Oda',
    description: 'The series focuses on Monkey D. Luffy, a young man who, inspired by his childhood idol and powerful pirate Red-Haired Shanks, sets off on a journey from the East Blue Sea to find the mythical treasure, the One Piece, and proclaim himself the King of the Pirates.',
    coverUrl: './manga_onepiece.jpg',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    chapters: generateMockChapters('One Piece', 4),
  },
  {
    id: '3',
    title: 'Naruto',
    author: 'Masashi Kishimoto',
    description: 'A young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
    coverUrl: './manga_naruto.jpg',
    genres: ['Action', 'Adventure', 'Fantasy'],
    chapters: generateMockChapters('Naruto', 3),
  },
  {
    id: '4',
    title: 'Demon Slayer',
    author: 'Koyoharu Gotouge',
    description: 'A boy raised by a family slaughtered by a demon joins an elite corps of demon fighters to avenge his family and cure his sister, who has been turned into a demon.',
    coverUrl: './manga_demonslayer.jpg',
    genres: ['Action', 'Adventure', 'Fantasy', 'Supernatural'],
    chapters: generateMockChapters('Demon Slayer', 4),
  },
  {
    id: '5',
    title: 'My Hero Academia',
    author: 'Kohei Horikoshi',
    description: 'A superhero manga series that follows a quirkless boy Izuku Midoriya and how he backed the greatest Hero alive.',
    coverUrl: './manga_myheroacademia.jpg',
    genres: ['Action', 'Adventure', 'Fantasy', 'Superhero'],
    chapters: generateMockChapters('My Hero Academia', 3),
  },
  {
    id: '6',
    title: 'Death Note',
    author: 'Tsugumi Ohba',
    description: 'A high school student discovers a supernatural notebook that grants its user the ability to kill anyone whose name and face they know.',
    coverUrl: './manga_deathnote.jpg',
    genres: ['Mystery', 'Psychological', 'Supernatural', 'Thriller'],
    chapters: generateMockChapters('Death Note', 3),
  },
  {
    id: '7',
    title: 'Dragon Ball',
    author: 'Akira Toriyama',
    description: 'Dragon Ball tells the tale of a young warrior named Goku, a young boy with a monkey tail who\'s on a quest to collect seven magical Dragon Balls.',
    coverUrl: './manga_dragonball.jpg',
    genres: ['Action', 'Adventure', 'Comedy', 'Martial Arts'],
    chapters: generateMockChapters('Dragon Ball', 3),
  },
  {
    id: '8',
    title: 'Fullmetal Alchemist',
    author: 'Hiromu Arakawa',
    description: 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes wrong and leaves them in damaged physical forms.',
    coverUrl: './manga_a.jpg',
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
    chapters: generateMockChapters('Fullmetal Alchemist', 3),
  },
  {
    id: '9',
    title: 'Tokyo Ghoul',
    author: 'Sui Ishida',
    description: 'A college student is attacked by a ghoul, a being that feeds on human flesh. He later receives an organ transplant from the ghoul, becoming part ghoul himself.',
    coverUrl: './manga_tokyoghoul.jpg',
    genres: ['Action', 'Drama', 'Horror', 'Supernatural'],
    chapters: generateMockChapters('Tokyo Ghoul', 3),
  },
  {
    id: '10',
    title: 'Hunter x Hunter',
    author: 'Yoshihiro Togashi',
    description: 'A young boy named Gon embarks on a journey to find his father, who left him at a young age to pursue his own dreams.',
    coverUrl: './manga_hunterxhunter.jpg',
    genres: ['Action', 'Adventure', 'Fantasy'],
    chapters: generateMockChapters('Hunter x Hunter', 3),
  },
];

// Generate mock chapters
function generateMockChapters(seriesName: string, numChapters: number): MangaChapter[] {
  const chapters: MangaChapter[] = [];
  
  for (let i = 1; i <= numChapters; i++) {
    // Calculate mock release date (more recent for higher chapter numbers)
    const releaseDate = new Date();
    releaseDate.setMonth(releaseDate.getMonth() - (numChapters - i));
    
    chapters.push({
      id: `${i}`,
      title: `Chapter ${i}: The Adventure Begins`,
      releaseDate: releaseDate.toLocaleDateString(),
      pages: generateMockPages(seriesName, i, 15) // Generate 15 pages per chapter
    });
  }
  
  return chapters;
}

// Generate mock pages for a chapter
function generateMockPages(seriesName: string, chapterNum: number, numPages: number): MangaPage[] {
  const pages: MangaPage[] = [];
  
  for (let i = 1; i <= numPages; i++) {
    pages.push({
      id: `page-${i}`,
      imageUrl: `https://placehold.co/600x900?text=${seriesName}+Ch${chapterNum}+Page${i}`,
      pageNumber: i
    });
  }
  
  return pages;
}

// API simulation functions
export const getMangas = async (
  page: number = 1, 
  limit: number = 10, 
  searchQuery: string = '', 
  genres: string[] = []
): Promise<{ mangas: Manga[], total: number }> => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Filter mangas based on search and genres
  let filteredMangas = [...MOCK_MANGAS];
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredMangas = filteredMangas.filter(manga => 
      manga.title.toLowerCase().includes(query) || 
      manga.author.toLowerCase().includes(query)
    );
  }
  
  if (genres.length > 0) {
    filteredMangas = filteredMangas.filter(manga => 
      genres.some(genre => manga.genres.includes(genre))
    );
  }
  
  // Calculate pagination
  const total = filteredMangas.length;
  const startIndex = (page - 1) * limit;
  const paginatedMangas = filteredMangas.slice(startIndex, startIndex + limit);
  
  return {
    mangas: paginatedMangas,
    total
  };
};

export async function getMangaById(id: string): Promise<Manga | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const manga = MOCK_MANGAS.find(m => m.id === id);
  return manga || null;
}

export async function getChapterById(mangaId: string, chapterId: string): Promise<MangaChapter | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const manga = await getMangaById(mangaId);
  if (!manga || !manga.chapters) return null;
  
  const chapter = manga.chapters.find(c => c.id === chapterId);
  return chapter || null;
}

// Search function for manga
export async function searchMangas(query: string): Promise<Manga[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  if (!query) return MOCK_MANGAS;
  
  const lowerQuery = query.toLowerCase();
  return MOCK_MANGAS.filter(manga => 
    manga.title.toLowerCase().includes(lowerQuery) || 
    manga.author.toLowerCase().includes(lowerQuery) ||
    manga.genres.some(genre => genre.toLowerCase().includes(lowerQuery))
  );
} 