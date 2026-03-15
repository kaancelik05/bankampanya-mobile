import { useQuery } from '@tanstack/react-query';
import { banks, brands, cardTypes, categories } from '@/mocks/onboarding';

export async function getOnboardingOptions() {
  return Promise.resolve({
    banks,
    cardTypes,
    categories,
    brands,
  });
}

export function useOnboardingOptions() {
  return useQuery({
    queryKey: ['onboarding', 'options'],
    queryFn: getOnboardingOptions,
  });
}
