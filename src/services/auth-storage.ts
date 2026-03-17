import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import type { AuthSession, AuthUser } from '@/types/auth';

const AUTH_STORAGE_KEY = 'bankampanya.auth.session';

type PersistedAuthState = {
  user: AuthUser;
  session: AuthSession;
};

async function canUseSecureStore() {
  if (Platform.OS === 'web') {
    return false;
  }

  return typeof SecureStore.isAvailableAsync === 'function' && (await SecureStore.isAvailableAsync());
}

function readWebStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY);
}

function writeWebStorage(value: string) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, value);
}

function clearWebStorage() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function savePersistedAuthState(payload: PersistedAuthState) {
  const serialized = JSON.stringify(payload);

  if (await canUseSecureStore()) {
    await SecureStore.setItemAsync(AUTH_STORAGE_KEY, serialized);
    return;
  }

  writeWebStorage(serialized);
}

export async function loadPersistedAuthState(): Promise<PersistedAuthState | null> {
  const raw = (await canUseSecureStore())
    ? await SecureStore.getItemAsync(AUTH_STORAGE_KEY)
    : readWebStorage();

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PersistedAuthState;
  } catch {
    return null;
  }
}

export async function updatePersistedAuthSession(session: AuthSession) {
  const persisted = await loadPersistedAuthState();
  if (!persisted) {
    return;
  }

  await savePersistedAuthState({
    user: persisted.user,
    session,
  });
}

export async function clearPersistedAuthState() {
  if (await canUseSecureStore()) {
    await SecureStore.deleteItemAsync(AUTH_STORAGE_KEY);
    return;
  }

  clearWebStorage();
}
