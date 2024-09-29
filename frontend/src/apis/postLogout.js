import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function postLogout() {
  const { data } = await axiosInstance.post(END_POINTS.POST_LOGOUT);
  return data;
}
