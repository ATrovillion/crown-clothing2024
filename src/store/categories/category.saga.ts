import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesSucess,
  fetchCategoriesFailed,
} from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSucess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

// trigger when we call fetchCategories
export function* onFetchCategories() {
  // responding to categoriesstart
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync,
  );
}

// accumulator to hold all sagas related to the category
export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
