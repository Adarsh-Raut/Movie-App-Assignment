import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

function MovieList({ movies, onMovieClick }) {

  // If no movies found it shows the following text
  if (movies.length === 0) {
    return (
      <div className={styles.noMovies}>
        <p>No movies found with that name. Please try a different search.</p>
      </div>
    );
  }

  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onCardClick={onMovieClick} />
      ))}
    </div>
  );
}

export default MovieList;