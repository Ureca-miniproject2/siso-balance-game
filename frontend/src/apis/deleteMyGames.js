import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function deleteMyGames(page, limit, gameId) {
  const { data } = await axiosInstance.delete(END_POINTS.DELETE_MY_GAMES(page, limit, gameId));

  return data;
}
