import { http, HttpResponse } from 'msw';
import data from './data/data.json';
import item from './data/item.json';
export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ data });
  }),

  http.get('/api/item', () => {
    return HttpResponse.json({ data: item });
  }),
];
