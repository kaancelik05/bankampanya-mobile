import { create } from 'zustand';

type OnboardingState = {
  selectedBanks: string[];
  selectedCardTypes: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  setSelectedBanks: (banks: string[]) => void;
  setSelectedCardTypes: (types: string[]) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedBrands: (brands: string[]) => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  selectedBanks: [],
  selectedCardTypes: [],
  selectedCategories: [],
  selectedBrands: [],
  setSelectedBanks: (selectedBanks) => set({ selectedBanks }),
  setSelectedCardTypes: (selectedCardTypes) => set({ selectedCardTypes }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
  setSelectedBrands: (selectedBrands) => set({ selectedBrands }),
}));
