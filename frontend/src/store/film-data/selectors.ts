import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmState, State} from '../../types/state';

export const getActiveFilm = createSelector(
  (state: State) => state[NameSpace.Film],
  (state: FilmState) => state.activeFilm
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Film],
  (state: FilmState) => state.isLoading
);
