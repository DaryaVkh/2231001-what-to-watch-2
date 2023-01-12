import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmsState, State} from '../../types/state';

export const getFilms = createSelector(
  (state: State) => state[NameSpace.Films],
  (state: FilmsState) => state.films
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Films],
  (state: FilmsState) => state.isLoading
);

export const getIsFavorite = createSelector(
  [getFilms, (_: any, id: string) => id],
  (films, id) => films.find((film) => film.id === id)?.isFavorite
);
