import { http, HttpResponse } from 'msw';
import data from './data/data.json';
export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ data });
  }),
];
