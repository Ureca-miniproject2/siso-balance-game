const END_POINTS = {
  GET_GAMES: (page, limit) => `/game?page=${page}&limit=${limit}`,
  CREATE_GAME: '/game',
};

export default END_POINTS;
