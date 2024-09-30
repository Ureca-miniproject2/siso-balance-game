import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function selectItem(gameId, itemId) {
  const { data } = await axiosInstance.post(END_POINTS.SELECT_ITEM(gameId, itemId));
  return data;
}
