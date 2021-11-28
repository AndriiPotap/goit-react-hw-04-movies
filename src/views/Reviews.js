import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as movieAPI from '../services/movie-api';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const message = "We don't have any reviews for this movie.";

  useEffect(() => {
    movieAPI
      .fetchMovieReviews(movieId)
      .then(({ results }) => {
        console.log(results);
        setReviews(results);
      })
      .catch(error => setError(error));
  }, [movieId]);

  return (
    <div>
      {error && error.message}
      {reviews && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h4>Author: {author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}

      {reviews.length === 0 && message}
    </div>
  );
}
