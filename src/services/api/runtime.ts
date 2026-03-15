import { env } from '@/config/env';

export function isMockMode() {
  return env.apiMode === 'mock';
}
