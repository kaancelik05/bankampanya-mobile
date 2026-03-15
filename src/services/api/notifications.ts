import { notifications } from '@/mocks/notifications';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { NotificationItem } from '@/types/notification';

async function getNotificationsMock(): Promise<NotificationItem[]> {
  return Promise.resolve(notifications);
}

export async function getNotifications(): Promise<NotificationItem[]> {
  if (isMockMode()) {
    return getNotificationsMock();
  }

  return apiRequest<NotificationItem[]>('/notifications');
}
