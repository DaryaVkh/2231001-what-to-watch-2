import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {SimilarFilmsState, State} from '../../types/state';

export const getSimilarFilms = createSelector(
  (state: State) => state[NameSpace.SimilarFilms],
  (state: SimilarFilmsState) => state.similarFilms
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.SimilarFilms],
  (state: SimilarFilmsState) => state.isLoading
);
