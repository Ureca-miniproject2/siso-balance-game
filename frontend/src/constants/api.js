const END_POINTS = {
  GET_GAMES: (page, limit) => `/game?page=${page}&limit=${limit}`,
  CREATE_GAME: '/game',
  GET_GAME_ITEMS: (gameId) => `/game/${gameId}/items`,
  GET_BEST_COMMENTS: (itemId) => `/item/${itemId}/comments/best`,
};

export default END_POINTS;
