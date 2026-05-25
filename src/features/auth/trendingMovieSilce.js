import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trendingMovie: []
};


const trendingMoviesSlice = createSlice({
  name: 'trendingMovies',
  initialState,
  reducers: {  
    deleteMovies: (state) => {
      state.trendingMovie = null;
    },
    setTrendingMovies: (state, action) => {
      state.trendingMovie = action.payload;
    }
  }
});

export const { setTrendingMovies, deleteMovies } = trendingMoviesSlice.actions;
export default trendingMoviesSlice.reducer;