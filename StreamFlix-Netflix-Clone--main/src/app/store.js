import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from '../services/moviesApi';
export const store=configureStore({reducer:{[moviesApi.reducerPath]:moviesApi.reducer},middleware:getDefault=>getDefault().concat(moviesApi.middleware)});
