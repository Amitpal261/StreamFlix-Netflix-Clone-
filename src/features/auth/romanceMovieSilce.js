import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  romanceMovie: []
};


const romanceMoviesSlice = createSlice({
  name: 'romanceMovies',
  initialState,
  reducers: {  
    deleteRomanceMovies: (state) => {
      state.romanceMovie = null;
    },
    setRomanceMovies: (state, action) => {
      state.romanceMovie = action.payload;
    }
  }
});

export const { setRomanceMovies, deleteRomanceMovies } = romanceMoviesSlice.actions;
export default romanceMoviesSlice.reducer;