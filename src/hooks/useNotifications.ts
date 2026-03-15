import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/services/api/notifications';

export function useNotificationsList() {
  return useQuery({
    queryKey: ['notifications', 'list'],
    queryFn: getNotifications,
  });
}
