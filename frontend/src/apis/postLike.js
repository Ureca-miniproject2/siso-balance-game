import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function postLike(commentId) {
  const { data } = await axiosInstance.post(END_POINTS.POST_LIKE(commentId));

  return data;
}
