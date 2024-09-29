import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function createComment(comment_text, item_id) {
  const { data } = await axiosInstance.post(END_POINTS.CREATE_COMMENT, { comment_text, item_id });
  return data;
}
