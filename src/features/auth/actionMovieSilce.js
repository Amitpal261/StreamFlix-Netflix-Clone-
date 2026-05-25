import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actionMovie: []
};


const actionMoviesSlice = createSlice({
  name: 'actionMovies',
  initialState,
  reducers: {  
    deleteActionMovies: (state) => {
      state.actionMovie = null;
    },
    setActionMovies: (state, action) => {
      state.actionMovie = action.payload;
    }
  }
});

export const { setActionMovies, deleteActionMovies } = actionMoviesSlice.actions;
export default actionMoviesSlice.reducer;