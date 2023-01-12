import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FavoriteFilmsState, State} from '../../types/state';

export const getFavoriteFilms = createSelector(
  (state: State) => state[NameSpace.FavoriteFilms],
  (state: FavoriteFilmsState) => state.favoriteFilms
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.FavoriteFilms],
  (state: FavoriteFilmsState) => state.isLoading
);
