import { http, HttpResponse } from 'msw';
import data from './data/data.json';
import item from './data/item.json';
import game from './data/game.json';
import comments from './data/comments.json';

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ data });
  }),

  http.get('/api/item', () => {
    return HttpResponse.json({ data: item });
  }),

  http.get("/api/game/1", () => {
    return HttpResponse.json({ data: game })
  }),

  http.get("/api/comments", () => {
    return HttpResponse.json({ data: comments })
  })
];
