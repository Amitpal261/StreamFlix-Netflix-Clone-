import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comedyMovie: []
};


const comedyMoviesSlice = createSlice({
  name: 'comedyMovies',
  initialState,
  reducers: {  
    deleteComedyMovies: (state) => {
      state.comedyMovie = null;
    },
    setComedyMovies: (state, action) => {
      state.comedyMovie = action.payload;
    }
  }
});

export const { setComedyMovies, deleteComedyMovies } = comedyMoviesSlice.actions;
export default comedyMoviesSlice.reducer;