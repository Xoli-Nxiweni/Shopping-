import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '../slices/listsSlice';
import authReducer from '../slices/authSlice';
import loadingReducer from '../slices/loadingSlice'; // Make sure this matches the actual reducer import

export const store = configureStore({
  reducer: {
    lists: listsReducer,
    auth: authReducer,
    loading: loadingReducer, // Add the loading reducer
  },
  // Default middleware includes thunk, so you don’t need to add it manually
});
