import React from 'react';
import styles from './MovieCard.module.css';

// MovieCard component to show a individual movie, poster and rating

function MovieCard({ movie, onCardClick }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

  return (
    <div className={styles.movieCard} onClick={() => onCardClick(movie)}>
      <img src={posterUrl} alt={movie.title} className={styles.poster} />
      <div className={styles.content}>
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.rating}>{movie.vote_average.toFixed(1)}</p>
      </div>
      <div className={styles.overlay}>
        <h2 className={styles.overlayTitle}>{movie.title}</h2>
        <p className={styles.overlayRating}>{movie.vote_average.toFixed(1)} / 10</p>
      </div>
    </div>
  );
}

export default MovieCard;