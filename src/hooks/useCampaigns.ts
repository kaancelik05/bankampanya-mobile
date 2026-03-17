import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFeaturedCampaignSummary, getPersonalizedCampaigns, joinCampaign } from '@/services/api/campaigns';

export function usePersonalizedCampaigns() {
  return useQuery({
    queryKey: ['campaigns', 'personalized'],
    queryFn: getPersonalizedCampaigns,
    retry: false,
  });
}

export function useFeaturedCampaignSummary() {
  return useQuery({
    queryKey: ['campaigns', 'featured-summary'],
    queryFn: getFeaturedCampaignSummary,
    retry: false,
  });
}

export function useJoinCampaignMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['tracking'] });
      queryClient.invalidateQueries({ queryKey: ['earnings'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
