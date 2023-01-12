import {useCallback, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import AddFilmForm from '../../components/add-film-form/add-film-form';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import Spinner from '../../components/spinner/spinner';
import UserBlock from '../../components/user-block/user-block';
import {AppRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/';
import {editFilm, fetchFilm} from '../../store/api-actions';
import {getActiveFilm, getIsLoading as getFilmIsLoading,} from '../../store/film-data/selectors';
import {Film} from '../../types/film';
import NotFoundPage from '../not-found-page/not-found-page';

function EditFilmPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const film = useAppSelector(getActiveFilm);
  const isFilmLoading = useAppSelector(getFilmIsLoading);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchFilm(id));
  }, [dispatch, id]);

  const handleSubmit = useCallback(async (offerData: Film) => {
    const response = await dispatch(editFilm(offerData));
    if (response.meta.requestStatus === 'rejected') {
      toast.error('Can\'t edit offer');
    } else {
      navigate(`${AppRoute.Film}/${id}`);
    }
  }, [dispatch, id, navigate]);

  if (isFilmLoading) {
    return <Spinner />;
  }

  if (!film) {
    return <NotFoundPage />;
  }


  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Edit film</h1>
        <UserBlock />
      </header>
      <div className="sign-in user-page__content">
        <AddFilmForm film={film} onSubmit={handleSubmit} />
      </div>
      <Footer />
    </div>
  );
}

export default EditFilmPage;
