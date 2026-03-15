import { profileMenuItems, userProfile } from '@/mocks/profile';

export async function getUserProfile() {
  return Promise.resolve(userProfile);
}

export async function getProfileMenuItems() {
  return Promise.resolve(profileMenuItems);
}
