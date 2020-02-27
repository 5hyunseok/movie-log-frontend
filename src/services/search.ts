import http from './http';

export const searchByTitle = (input: string) => {
  return http.get(`/search?s=${input}`);
}