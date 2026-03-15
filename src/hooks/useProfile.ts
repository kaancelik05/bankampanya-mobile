import { useQuery } from '@tanstack/react-query';
import { getProfileMenuItems, getUserProfile } from '@/services/api/profile';

export function useUserProfile() {
  return useQuery({
    queryKey: ['profile', 'user'],
    queryFn: getUserProfile,
  });
}

export function useProfileMenuItems() {
  return useQuery({
    queryKey: ['profile', 'menu-items'],
    queryFn: getProfileMenuItems,
  });
}
