import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '../slices/listsSlice';
import authReducer from '../slices/authSlice';
import loadingReducer from '../slices/loadingSlice'; 
import categorySlice from '../slices/categorySlice';

export const store = configureStore({
  reducer: {
    lists: listsReducer,
    auth: authReducer,
    loading: loadingReducer, 
    category: categorySlice,
  },
});
