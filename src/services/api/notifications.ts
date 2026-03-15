import { notifications } from '@/mocks/notifications';
import type { NotificationItem } from '@/types/notification';

export async function getNotifications(): Promise<NotificationItem[]> {
  return Promise.resolve(notifications);
}
