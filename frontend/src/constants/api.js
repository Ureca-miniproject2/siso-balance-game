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
  CREATE_COMMENT: '/comment',
  GET_MY_GAMES: (page, limit) => `/game/user?page=${page}&limit=${limit}`,
  DELETE_MY_GAMES: (gameId) => `/game/${gameId}`,
  DELETE_COMMENT: (commentId) => `/comment/${commentId}`,
  SELECT_ITEM: (gameId, itemId) => `/games/${gameId}/items/${itemId}/select`,
};

export default END_POINTS;
