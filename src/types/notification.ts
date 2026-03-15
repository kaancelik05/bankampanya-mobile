export type NotificationType = 'campaign' | 'tracking' | 'credit' | 'assistant';

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timeLabel: string;
  ctaLabel: string;
  route: string;
  tone: 'success' | 'warning' | 'info';
};
