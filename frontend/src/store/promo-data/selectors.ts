import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {PromoState, State} from '../../types/state';

export const getPromoFilm = createSelector(
  (state: State) => state[NameSpace.Promo],
  (state: PromoState) => state.promoFilm
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Promo],
  (state: PromoState) => state.isLoading
);
