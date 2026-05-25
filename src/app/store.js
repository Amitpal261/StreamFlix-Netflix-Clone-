import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSilce';
import { moviesApi } from '../services/moviesApi';
export const store = configureStore({
  reducer: {
    auth: authReducer,
     [moviesApi.reducerPath]: moviesApi.reducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});