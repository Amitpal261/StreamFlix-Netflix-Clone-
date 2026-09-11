import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSilce';
import chatGptReducer from '../features/chatGpt/chatGptSilce';
import chatGptReplyReducer from '../features/chatGpt/chatGptReplySilce';
import { moviesApi } from '../services/moviesApi';
export const store = configureStore({
  reducer: {
    chatGptReply: chatGptReplyReducer,
    auth: authReducer,
    chatGpt: chatGptReducer,
     [moviesApi.reducerPath]: moviesApi.reducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});