import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';

const taskInitialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const extraActions = [fetchTasks, addTask, deleteTask, toggleCompleted];

const getActions = type => isAnyOf(...extraActions.map(action => action[type]));

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: taskInitialState,
  extraReducers: builder =>
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          task => task.id === action.payload.id
        );
        state.tasks.splice(index, 1);
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          task => task.id === action.payload.id
        );
        state.tasks.splice(index, 1, action.payload);
      })
      .addMatcher(getActions('pending'), state => {
        state.isLoading = true;
      })
      .addMatcher(getActions('rejected'), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(getActions('fulfilled'), state => {
        state.isLoading = false;
        state.error = null;
      }),
});

export const tasksReducer = tasksSlice.reducer;
