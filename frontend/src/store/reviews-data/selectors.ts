import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ReviewsState, State} from '../../types/state';

export const getReviews = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsState) => state.reviews
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsState) => state.isLoading
);
