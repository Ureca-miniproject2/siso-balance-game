import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function deleteLike(commentId) {
  const { data } = await axiosInstance.delete(END_POINTS.DELETE_LIKE(commentId));

  return data;
}
