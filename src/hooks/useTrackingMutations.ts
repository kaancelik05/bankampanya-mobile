import { useMutation } from '@tanstack/react-query';
import { createTrackingEvent } from '@/services/api/mutations';

export function useCreateTrackingEventMutation() {
  return useMutation({
    mutationFn: createTrackingEvent,
  });
}
