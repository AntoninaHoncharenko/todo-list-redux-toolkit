import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { taskReducer } from './taskSlice';
import { filterReducer } from './filterSlice';

const persistTaskConfig = {
  key: 'tasks',
  storage,
};

const persistFilterConfig = {
  key: 'filters',
  storage,
};

const persistedTaskReducer = persistReducer(persistTaskConfig, taskReducer);

const persistedFilterReducer = persistReducer(
  persistFilterConfig,
  filterReducer
);

export const store = configureStore({
  reducer: {
    tasks: persistedTaskReducer,
    filters: persistedFilterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
