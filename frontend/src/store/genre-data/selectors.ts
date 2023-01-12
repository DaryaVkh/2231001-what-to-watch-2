import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {GenreState, State} from '../../types/state';

export const getActiveGenre = createSelector(
  (state: State) => state[NameSpace.Genre],
  (state: GenreState) => state.activeGenre
);

export const getFilmsByGenre = createSelector(
  (state: State) => state[NameSpace.Genre],
  (state: GenreState) => state.filmsByGenre
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Genre],
  (state: GenreState) => state.isLoading
);
