const BASE = 'https://api.themoviedb.org/3';
const key = import.meta.env.VITE_TMDB_API_KEY || import.meta.env.VITE_API_KEY || '';

export const TMDB_IMAGE = 'https://image.tmdb.org/t/p';
export const tmdbConfigured = Boolean(key);

async function request(path, params = {}) {
  if (!key) throw new Error('TMDB API key is not configured. Add VITE_TMDB_API_KEY to .env.');
  const url = new URL(`${BASE}${path}`);
  Object.entries({ api_key: key, language: 'en-US', ...params }).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error(`TMDB request failed (${response.status})`);
  return response.json();
}

export const imageUrl = (path, size = 'w500') => path ? `${TMDB_IMAGE}/${size}${path}` : '/favicon.svg';
export const backdropUrl = (path, size = 'original') => path ? `${TMDB_IMAGE}/${size}${path}` : '';

export const getTrending = () => request('/trending/all/week');
export const getPopularMovies = () => request('/movie/popular');
export const getTopRatedMovies = () => request('/movie/top_rated');
export const getNowPlaying = () => request('/movie/now_playing');
export const getUpcoming = () => request('/movie/upcoming');
export const getPopularTv = () => request('/tv/popular');
export const getTopRatedTv = () => request('/tv/top_rated');
export const discoverMovies = (params = {}) => request('/discover/movie', { sort_by: 'popularity.desc', include_adult: false, ...params });
export const discoverTv = (params = {}) => request('/discover/tv', { sort_by: 'popularity.desc', include_adult: false, ...params });
export const searchMulti = (query, page = 1) => request('/search/multi', { query, page, include_adult: false });
export const getDetails = (type, id) => request(`/${type}/${id}`, { append_to_response: 'videos,credits,similar,recommendations' });
export const getGenres = (type = 'movie') => request(`/genre/${type}/list`);
