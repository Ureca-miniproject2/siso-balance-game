import { axiosInstance } from '.';
import END_POINTS from '../constants/api';

export default async function createGame({ firstItemText, secondItemText }) {
  return await axiosInstance.post(END_POINTS.CREATE_GAME, {
    firstItemText,
    secondItemText,
  });
}
