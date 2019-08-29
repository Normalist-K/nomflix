import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'd367713322fbd7b41ca515c20dbe05ac',
    language: 'en-US',
  },
});

export const moviesApi = {
  nowPlaying: () => api.get('movie/now_playing'),
  upComing: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: { append_to_response: 'videos' },
    }),
  search: term =>
    api.get('search/movie', {
      params: { query: encodeURIComponent(term) },
    }),
};

export const tvApi = {
  airingToday: () => api.get('tv/airing_today'),
  popular: () => api.get('tv/popular'),
  topRated: () => api.get('tv/top_rated'),
  tvDetail: id =>
    api.get(`tv/${id}`, {
      params: { append_to_response: 'videos' },
    }),
  search: term =>
    api.get('search/tv', {
      params: { query: encodeURIComponent(term) },
    }),
};
