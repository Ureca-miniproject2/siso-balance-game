import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function getGames(page, limit) {
  const { data } = await axiosInstance.get(END_POINTS.GET_GAMES(page, limit));
  return data;
}
