const END_POINTS = {
  GET_GAMES: (page, limit) => `/game?page=${page}&limit=${limit}`,
  CREATE_GAME: '/game',
  GET_GAME_ITEMS:(gameId)=>`/game/${gameId}/items`
};

export default END_POINTS;
