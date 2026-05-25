import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  horrorMovie: []
};


const horrorMoviesSlice = createSlice({
  name: 'horrorMovies',
  initialState,
  reducers: {  
    deleteHorrorMovies: (state) => {
      state.horrorMovie = null;
    },
    setHorrorMovies: (state, action) => {
      state.horrorMovie = action.payload;
    }
  }
});

export const { setHorrorMovies, deleteHorrorMovies } = horrorMoviesSlice.actions;
export default horrorMoviesSlice.reducer;