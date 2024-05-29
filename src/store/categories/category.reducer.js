import { CATEGORIES_ACTION_TYPES } from './category.types';

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

// reducer deals with the data from the API in the most basic format; data will then be shaped by the selector
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {},
) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
