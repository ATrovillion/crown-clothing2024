import { configureStore } from '@reduxjs/toolkit';
// import { compose, createStore, applyMiddleware } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';

// import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';

// // create config object to tell redux what we want to persist
// const persistConfig = {
//   key: 'root', // persist the whole thing
//   storage,
//   blacklist: ['user'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean,
);

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

// export const persistor = persistStore(store);
