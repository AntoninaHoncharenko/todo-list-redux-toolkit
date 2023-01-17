import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';

const taskInitialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const extraActions = [fetchTasks, addTask, deleteTask, toggleCompleted];

const getActions = type => isAnyOf(...extraActions.map(action => action[type]));

const fetchTasksReducer = (state, action) => {
  state.tasks = action.payload;
};

const addTaskReducer = (state, action) => {
  state.tasks.push(action.payload);
};

const deleteTaskReducer = (state, action) => {
  const index = state.tasks.findIndex(task => task.id === action.payload.id);
  state.tasks.splice(index, 1);
};

const toggleCompletedReducer = (state, action) => {
  const index = state.tasks.findIndex(task => task.id === action.payload.id);
  state.tasks.splice(index, 1, action.payload);
};

const pendingReducer = state => {
  state.isLoading = true;
};

const rejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fulfilledReducer = state => {
  state.isLoading = false;
  state.error = null;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: taskInitialState,
  extraReducers: builder =>
    builder
      .addCase(fetchTasks.fulfilled, fetchTasksReducer)
      .addCase(addTask.fulfilled, addTaskReducer)
      .addCase(deleteTask.fulfilled, deleteTaskReducer)
      .addCase(toggleCompleted.fulfilled, toggleCompletedReducer)
      .addMatcher(getActions('pending'), pendingReducer)
      .addMatcher(getActions('rejected'), rejectedReducer)
      .addMatcher(getActions('fulfilled'), fulfilledReducer),
});

export const tasksReducer = tasksSlice.reducer;
