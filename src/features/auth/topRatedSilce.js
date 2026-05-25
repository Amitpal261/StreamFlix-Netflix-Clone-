import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topRatedMovie: []
};


const topRatedMoviesSlice = createSlice({
  name: 'topRatedMovies',
  initialState,
  reducers: {  
    deleteTopRatedMovies: (state) => {
      state.topRatedMovie = null;
    },
    setTopRatedMovies: (state, action) => {
      state.topRatedMovie = action.payload;
    }
  }
});

export const { setTopRatedMovies, deleteTopRatedMovies } = topRatedMoviesSlice.actions;
export default topRatedMoviesSlice.reducer;