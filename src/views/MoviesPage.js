import { useEffect, useState } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import * as movieAPI from '../services/movie-api';
import PageHeading from '../components/PageHeading/PageHeading';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [movies, setMovies] = useState([]);

  const [query, setQuery] = useState('');

  const getQuery = new URLSearchParams(location.search).get('query');
  const [searchQuery, setSearchQuery] = useState(getQuery ? getQuery : '');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    movieAPI.fetchSearchMovies(searchQuery).then(({ results }) => {
      if (results.length === 0) {
        alert(`Not match for reaquest ${searchQuery}`);
        return;
      }

      setMovies(results);
    });
  }, [searchQuery]);

  const onInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmitInput = event => {
    event.preventDefault();

    if (query.trim() === '') {
      alert('Please enter text');
      return;
    }

    history.push({ ...location, search: `query=${query}` });

    setSearchQuery(query);
    setQuery('');
  };

  return (
    <>
      <PageHeading text="Movies" />
      <form onSubmit={handleSubmitInput}>
        <label>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={onInputChange}
            placeholder="Search movie..."
          ></input>
        </label>
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: { location } },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
