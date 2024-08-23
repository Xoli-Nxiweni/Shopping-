import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '../slices/listsSlice';
import authReducer from '../slices/authSlice';
import loadingReducer from '../slices/loadingSlice'; 

export const store = configureStore({
  reducer: {
    lists: listsReducer,
    auth: authReducer,
    loading: loadingReducer, 
  },
});
