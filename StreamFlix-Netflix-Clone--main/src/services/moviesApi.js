import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const key = import.meta.env.VITE_TMDB_API_KEY || import.meta.env.VITE_API_KEY || '';
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/', prepareHeaders: (headers) => headers }),
  endpoints: (builder) => ({
    getTrending: builder.query({ query: () => `trending/all/week?api_key=${key}` }),
    getTopRated: builder.query({ query: () => `movie/top_rated?api_key=${key}` }),
    getByGenre: builder.query({ query: (genreId) => `discover/movie?with_genres=${genreId}&api_key=${key}` }),
    searchMovie: builder.query({ query: (name) => `search/multi?query=${encodeURIComponent(name)}&api_key=${key}&include_adult=false` }),
    getMovieVideos: builder.query({ query: (movieId) => `movie/${movieId}/videos?api_key=${key}` }),
  }),
});
export const { useGetTrendingQuery, useGetTopRatedQuery, useGetByGenreQuery, useGetMovieVideosQuery, useSearchMovieQuery } = moviesApi;
