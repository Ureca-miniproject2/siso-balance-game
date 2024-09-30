import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function getGameItems(gameId) {
  const { data } = await axiosInstance.get(END_POINTS.GET_GAME_ITEMS(gameId));
  return data;
}