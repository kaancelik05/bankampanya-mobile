import { profileMenuGroups, profileMenuItems, userProfile } from '@/mocks/profile';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { ProfileMenuItem, UserProfile } from '@/types/profile';

function mapProfileMenuItems(groups: Array<{ items: ProfileMenuItem[] }>): ProfileMenuItem[] {
  return groups.flatMap((group) => group.items);
}

type RemoteProfileResponse = {
  summary: UserProfile;
  menuGroups: Array<{
    id: string;
    title: string;
    items: ProfileMenuItem[];
  }>;
};

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

  const response = await apiRequest<RemoteProfileResponse>('/api/mobile/profile');
  return response.summary;
}

export async function getProfileMenuItems(): Promise<ProfileMenuItem[]> {
  if (isMockMode()) {
    return getProfileMenuItemsMock();
  }

  const response = await apiRequest<RemoteProfileResponse>('/api/mobile/profile');
  return mapProfileMenuItems(response.menuGroups);
}

export async function getProfileMenuGroups() {
  if (isMockMode()) {
    return Promise.resolve(profileMenuGroups);
  }

  const response = await apiRequest<RemoteProfileResponse>('/api/mobile/profile');
  return response.menuGroups;
}
