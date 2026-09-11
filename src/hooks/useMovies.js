import {
  useGetTrendingQuery,
  useGetTopRatedQuery,
  useGetByGenreQuery,
} from '../services/moviesApi';

export const useMovies = () => {
  return {
    trending: useGetTrendingQuery(),
    topRated: useGetTopRatedQuery(),
    action: useGetByGenreQuery(28),
    comedy: useGetByGenreQuery(35),
  };
};