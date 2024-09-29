import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../constants/queryKeys';
import getUserInfo from '../../apis/getUserInfo';

export default function useGetUserInfo() {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_INFO],
    queryFn: async () => {
      const response = await getUserInfo();
      return response;
    },
  });
}
