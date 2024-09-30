import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function getMyGames(page, limit) {
  const { data } = await axiosInstance.get(END_POINTS.GET_MY_GAMES(page, limit));
  return data;
}
