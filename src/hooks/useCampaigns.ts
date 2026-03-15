import { useQuery } from '@tanstack/react-query';
import { getFeaturedCampaignSummary, getPersonalizedCampaigns } from '@/services/api/campaigns';

export function usePersonalizedCampaigns() {
  return useQuery({
    queryKey: ['campaigns', 'personalized'],
    queryFn: getPersonalizedCampaigns,
  });
}

export function useFeaturedCampaignSummary() {
  return useQuery({
    queryKey: ['campaigns', 'featured-summary'],
    queryFn: getFeaturedCampaignSummary,
  });
}
