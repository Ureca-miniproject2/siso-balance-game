import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function getBestComments(itemId) {
  const { data } = await axiosInstance.get(END_POINTS.GET_BEST_COMMENTS(itemId));
  return data;
}
