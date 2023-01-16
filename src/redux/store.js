import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './taskSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filterReducer,
  },
});
