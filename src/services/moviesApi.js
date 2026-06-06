import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../../utils/contest";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
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
  searchMovie: builder.query({
  query: (movieName) =>
    `search/movie?query=${movieName}&api_key=${API_KEY}`,
}),
    // ✅ FIX HERE (ADD API KEY)
    getMovieVideos: builder.query({
      query: (movieId) =>
        `movie/${movieId}/videos?api_key=${API_KEY}`,
    }),
  }),
});

export const {
  useGetTrendingQuery,
  useGetTopRatedQuery,
  useGetByGenreQuery,
  useGetMovieVideosQuery,
  useSearchMovieQuery,
} = moviesApi;