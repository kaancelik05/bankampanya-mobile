import { profileMenuItems, userProfile } from '@/mocks/profile';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { ProfileMenuItem, UserProfile } from '@/types/profile';

async function getUserProfileMock(): Promise<UserProfile> {
  return Promise.resolve(userProfile);
}

async function getProfileMenuItemsMock(): Promise<ProfileMenuItem[]> {
  return Promise.resolve(profileMenuItems);
}

export async function getUserProfile(): Promise<UserProfile> {
  if (isMockMode()) {
    return getUserProfileMock();
  }

  return apiRequest<UserProfile>('/profile');
}

export async function getProfileMenuItems(): Promise<ProfileMenuItem[]> {
  if (isMockMode()) {
    return getProfileMenuItemsMock();
  }

  return apiRequest<ProfileMenuItem[]>('/profile/menu-items');
}
