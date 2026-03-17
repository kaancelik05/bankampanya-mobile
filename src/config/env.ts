import Constants from 'expo-constants';

type EnvConfig = {
  apiBaseUrl: string;
  apiMode: 'mock' | 'remote';
  enableNetworkLogging: boolean;
};

type ExpoExtra = {
  apiBaseUrl?: string;
  apiMode?: 'mock' | 'remote';
  enableNetworkLogging?: boolean;
};

const extra = (Constants.expoConfig?.extra ?? {}) as ExpoExtra;

function normalizeApiBaseUrl(value?: string) {
  const fallback = 'http://localhost:5001/api';

  if (!value) return fallback;

  return value.endsWith('/') ? value.slice(0, -1) : value;
}

export const env: EnvConfig = {
  apiBaseUrl: normalizeApiBaseUrl(extra.apiBaseUrl),
  apiMode: extra.apiMode === 'remote' ? 'remote' : 'mock',
  enableNetworkLogging: true,
};
