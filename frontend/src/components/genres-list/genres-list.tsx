import cn from 'classnames';
import {useEffect} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {DEFAULT_GENRE, GENRES} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/';
import {setActiveGenre} from '../../store/genre-data/genre-data';
import {getActiveGenre} from '../../store/genre-data/selectors';
import {capitalize} from '../../util';

function GenresList() {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector(getActiveGenre);
  const genres = [DEFAULT_GENRE, ...GENRES];
  const [searchParams] = useSearchParams();
  const searchGenre = searchParams.get('genre');

  useEffect(() => {
    const loweredSearchGenre = searchGenre?.toLowerCase();

    if (loweredSearchGenre === activeGenre.toLowerCase()) {
      return;
    }

    if (loweredSearchGenre && genres.includes(loweredSearchGenre)) {
      dispatch(setActiveGenre(loweredSearchGenre));
      return;
    }

    dispatch(setActiveGenre(DEFAULT_GENRE));
  }, [searchGenre, dispatch, genres, activeGenre]);

  return (
    <ul className="catalog__genres-list">
      {genres.slice(0, 10).map((genre) => (
        <li
          key={genre}
          className={cn('catalog__genres-item', {
            'catalog__genres-item--active': genre === activeGenre,
          })}
        >
          <Link to={`?genre=${genre}`} className="catalog__genres-link">
            {capitalize(genre)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
