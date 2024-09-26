import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieDetails.module.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieDetails({ movie }) {
  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {

    // To fetch the details of the movie clicked on the MovieCard

    const fetchDetails = async () => {
      try {
        const [detailsResponse, videosResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
        ]);

        setDetails(detailsResponse.data);
        const trailerVideo = videosResponse.data.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailer(trailerVideo);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchDetails();
  }, [movie.id]);

  // While details are not found it shows loading
  if (!details) return <div>Loading...</div>;

  return (
    <div className={styles.movieDetails}>
      <h2>{details.title}</h2>
      <p>{details.overview}</p>
      <p>Release Date: {details.release_date}</p>
      <p>Runtime: {details.runtime} minutes</p>
      <p>Genres: {details.genres.map(genre => genre.name).join(', ')}</p>
      {trailer && (
        <div className={styles.trailerContainer}>
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;