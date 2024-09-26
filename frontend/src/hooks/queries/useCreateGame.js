import { useMutation } from '@tanstack/react-query';
import createGame from '../../apis/createGame';
import { useNavigate } from 'react-router-dom';
export default function useCreateGame() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ firstItemText, secondItemText }) =>
      await createGame({ firstItemText, secondItemText }),
    onSuccess: () => {
      alert('성공했습니다.');
      navigate('/');
    },
    onError: () => {
      alert('실패했습니다.');
    },
  });
}