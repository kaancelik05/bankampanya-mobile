import { useQuery } from '@tanstack/react-query';
import { getTrackedCampaignById, getTrackedCampaigns } from '@/services/api/tracking';

export function useTrackedCampaigns() {
  return useQuery({
    queryKey: ['tracking', 'list'],
    queryFn: getTrackedCampaigns,
  });
}

export function useTrackedCampaignDetail(id?: string) {
  return useQuery({
    queryKey: ['tracking', 'detail', id],
    queryFn: () => getTrackedCampaignById(id || ''),
    enabled: !!id,
  });
}
