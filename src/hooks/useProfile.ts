import { useQuery } from '@tanstack/react-query';
import { getProfileMenuItems, getUserProfile } from '@/services/api/profile';
import { profileMenuGroups } from '@/mocks/profile';

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

export function useProfileMenuGroups() {
  return useQuery({
    queryKey: ['profile', 'menu-groups'],
    queryFn: async () => Promise.resolve(profileMenuGroups),
  });
}
