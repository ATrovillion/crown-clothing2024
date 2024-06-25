import { AnyAction } from 'redux-saga';
import {  Category } from './category.types';
import { fetchCategoriesStart, fetchCategoriesSucess, fetchCategoriesFailed } from './category.action';

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

// reducer deals with the data from the API in the most basic format; data will then be shaped by the selector
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as AnyAction
): CategoriesState => {
  if(fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if(fetchCategoriesSucess.match(action)) {
    return {...state, categories: action.payload, isLoading: false };
  }

  if(fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
