import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function deleteComment(commentId) {
  const { data } = await axiosInstance.delete(END_POINTS.DELETE_COMMENT(commentId));
  return data;
}
