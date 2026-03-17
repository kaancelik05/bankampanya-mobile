import { earningsDashboard } from '@/mocks/earnings';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { EarningsAlert, EarningsDashboard, EarningsHistoryItem, EarningsStat, PotentialEarningItem } from '@/types/earnings';

function mapStatTone(tone: string | undefined): EarningsStat['tone'] {
  if (tone === 'success' || tone === 'warning' || tone === 'info') {
    return tone;
  }

  return 'default';
}

function mapAlertTone(tone: string): EarningsAlert['tone'] {
  if (tone === 'warning' || tone === 'danger' || tone === 'info') {
    return tone;
  }

  return 'info';
}

function mapHistoryStatus(status: string): EarningsHistoryItem['status'] {
  return status === 'completed' || status === 'rewarded' ? 'completed' : 'pending';
}

function mapEarningsDashboard(input: {
  summary: EarningsDashboard['summary'];
  stats: Array<{ id: string; label: string; valueText: string; tone?: string }>;
  history: Array<{ id: string; title: string; bankName: string; rewardText: string; status: string; dateLabel: string }>;
  potential: PotentialEarningItem[];
  alerts: Array<{ id: string; title: string; description: string; tone: string }>;
}): EarningsDashboard {
  return {
    summary: input.summary,
    stats: input.stats.map((item) => ({
      ...item,
      tone: mapStatTone(item.tone),
    })),
    history: input.history.map((item) => ({
      ...item,
      status: mapHistoryStatus(item.status),
    })),
    potential: input.potential,
    alerts: input.alerts.map((item) => ({
      ...item,
      tone: mapAlertTone(item.tone),
    })),
  };
}

async function getEarningsDashboardMock(): Promise<EarningsDashboard> {
  return Promise.resolve(earningsDashboard);
}

export async function getEarningsDashboard(): Promise<EarningsDashboard> {
  if (isMockMode()) {
    return getEarningsDashboardMock();
  }

  const response = await apiRequest<Parameters<typeof mapEarningsDashboard>[0]>('/api/mobile/earnings');
  return mapEarningsDashboard(response);
}
