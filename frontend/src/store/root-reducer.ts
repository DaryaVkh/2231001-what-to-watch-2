import {combineReducers} from 'redux';
import {NameSpace} from '../const';
import {favoriteFilmsData} from './favorite-films-data/favorite-films-data';
import {filmData} from './film-data/film-data';
import {filmsData} from './films-data/films-data';
import {genreData} from './genre-data/genre-data';
import {promoData} from './promo-data/promo-data';
import {reviewsData} from './reviews-data/reviews-data';
import {similarFilmsData} from './similar-films-data/similar-films-data';
import {userData} from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.Films]: filmsData.reducer,
  [NameSpace.Genre]: genreData.reducer,
  [NameSpace.Film]: filmData.reducer,
  [NameSpace.User]: userData.reducer,
  [NameSpace.SimilarFilms]: similarFilmsData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.FavoriteFilms]: favoriteFilmsData.reducer,
  [NameSpace.Promo]: promoData.reducer,
});
