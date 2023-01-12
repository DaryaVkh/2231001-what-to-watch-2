import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import VideoPlayer from '../../components/video-player/video-player';
import {useAppDispatch, useAppSelector} from '../../hooks/';
import {fetchFilm} from '../../store/api-actions';
import {getActiveFilm, getIsLoading} from '../../store/film-data/selectors';
import NotFoundPage from '../not-found-page/not-found-page';

function PlayerPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const film = useAppSelector(getActiveFilm);
  const isLoading = useAppSelector(getIsLoading);

  useEffect(() => {
    if (!id) {
      return;
    }

    if (id !== film?.id) {
      dispatch(fetchFilm(id));
    }
  }, [dispatch, id, film?.id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (film) {
    return <VideoPlayer film={film} />;
  }

  return <NotFoundPage />;
}

export default PlayerPage;
