import { axiosInstance } from '.';

export default async function getUserInfo() {
  const { data } = await axiosInstance.get('/user');
  return data;
}
