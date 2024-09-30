import { useMutation } from '@tanstack/react-query';
import createGame from '../../apis/createGame';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function useCreateGame() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ firstItemText, secondItemText }) =>
      await createGame({ firstItemText, secondItemText }),
    onSuccess: () => {
      toast.success('게임이 등록되었습니다.');
      navigate('/');
    },
    onError: () => {
      toast.error('게임 등록에 실패했습니다.');
    },
  });
}
