import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import MovieList from './components/MovieList/MovieList';
import Modal from './components/Modal/Modal';
import MovieDetails from './components/MovieDetails/MovieDetails';
import styles from './App.module.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies] = useState([]);
  const [isHomePage, setIsHomePage] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMovies = async (url) => {
    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  // On page load fetch popular movies
  const fetchPopularMovies = () => {
    const popularMoviesUrl = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(popularMoviesUrl);
    setIsHomePage(true);
  };

  // Handle User search for movies
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      fetchPopularMovies();
    } else {
      const searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchTerm)}&page=1`;
      fetchMovies(searchUrl);
      setIsHomePage(false);
    }
  };

  const handleHomeClick = () => {
    fetchPopularMovies();
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.app}>
      <Header onSearch={handleSearch} onHomeClick={handleHomeClick} />
      <h2 className={styles.pageTitle}>{isHomePage ? 'Popular Movies' : 'Search Results'}</h2>
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedMovie && <MovieDetails movie={selectedMovie} />}
      </Modal>
    </div>
  );
}

export default App;