import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function getComments(itemId, page, limit) {
  const { data } = await axiosInstance.get(END_POINTS.GET_COMMENTS(itemId, page, limit));
  return data;
}
