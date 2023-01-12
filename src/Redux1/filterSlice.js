import { createSlice } from '@reduxjs/toolkit';
import { statusFilters } from './constants';

const filtersInitialState = {
  status: statusFilters.all,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filtersInitialState,
  reducers: {
    setStatusFilter(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setStatusFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
