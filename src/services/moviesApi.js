import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY } from '../../utils/contest';


export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
  }),

  endpoints: (builder) => ({
    
    getTrending: builder.query({
      query: () => `trending/movie/day?api_key=${API_KEY}`,
    }),

    getTopRated: builder.query({
      query: () => `movie/top_rated?api_key=${API_KEY}`,
    }),

    getByGenre: builder.query({
      query: (genreId) =>
        `discover/movie?with_genres=${genreId}&api_key=${API_KEY}`,
    }),
    getMovieVideos: builder.query({
   query: (movieId) => `/movie/${movieId}/videos`,
}),

  }),
});

export const {
  useGetTrendingQuery,
  useGetTopRatedQuery,
  useGetByGenreQuery,
  useGetMovieVideosQuery,
} = moviesApi;