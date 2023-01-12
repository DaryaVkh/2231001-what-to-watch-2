import {useEffect} from 'react';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import Spinner from '../../components/spinner/spinner';
import UserBlock from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks/';
import {fetchFavoriteFilms} from '../../store/api-actions';
import {getFavoriteFilms, getIsLoading,} from '../../store/favorite-films-data/selectors';

function MyListPage() {
  const dispatch = useAppDispatch();
  const myFilms = useAppSelector(getFavoriteFilms);
  const isLoading = useAppSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={myFilms} withVideo={false} />
      </section>

      <Footer />
    </div>
  );
}

export default MyListPage;
