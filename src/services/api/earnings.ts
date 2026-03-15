import { earningsDashboard } from '@/mocks/earnings';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { EarningsDashboard } from '@/types/earnings';

async function getEarningsDashboardMock(): Promise<EarningsDashboard> {
  return Promise.resolve(earningsDashboard);
}

export async function getEarningsDashboard(): Promise<EarningsDashboard> {
  if (isMockMode()) {
    return getEarningsDashboardMock();
  }

  return apiRequest<EarningsDashboard>('/earnings/dashboard');
}
