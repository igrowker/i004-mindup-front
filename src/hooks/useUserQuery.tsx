import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../api/userService';

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: false,
  });
};
