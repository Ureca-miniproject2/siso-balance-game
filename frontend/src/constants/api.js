const END_POINTS = {
  GET_GAMES: (page, limit) => `/game?page=${page}&limit=${limit}`,
  CREATE_GAME: '/game',
  GET_GAME_ITEMS: (gameId) => `/game/${gameId}/items`,
  GET_BEST_COMMENTS: (itemId) => `/item/${itemId}/comments/best`,
  GET_COMMENTS: (itemId, page, limit) => `/item/${itemId}/comments?page=${page}&limit=${limit}`,
  GET_USER_INFO: '/user',
  POST_LOGOUT: '/auth/logout',
  POST_LIKE: (commentId) => `/like/${commentId}`,
  DELETE_LIKE: (commentId) => `/like/${commentId}`,
};

export default END_POINTS;
