import { useQuery } from '@tanstack/react-query';
import { getEarningsDashboard } from '@/services/api/earnings';

export function useEarningsDashboard() {
  return useQuery({
    queryKey: ['earnings', 'dashboard'],
    queryFn: getEarningsDashboard,
  });
}
