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
  reset: () => void;
  getProgressStep: () => number;
  canContinueFromCards: () => boolean;
  canContinueFromInterests: () => boolean;
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  selectedBanks: [],
  selectedCardTypes: [],
  selectedCategories: [],
  selectedBrands: [],
  setSelectedBanks: (selectedBanks) => set({ selectedBanks }),
  setSelectedCardTypes: (selectedCardTypes) => set({ selectedCardTypes }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
  setSelectedBrands: (selectedBrands) => set({ selectedBrands }),
  reset: () =>
    set({
      selectedBanks: [],
      selectedCardTypes: [],
      selectedCategories: [],
      selectedBrands: [],
    }),
  getProgressStep: () => {
    const { selectedBanks, selectedCardTypes, selectedCategories, selectedBrands } = get();

    if (selectedCategories.length > 0 || selectedBrands.length > 0) return 3;
    if (selectedBanks.length > 0 || selectedCardTypes.length > 0) return 2;
    return 1;
  },
  canContinueFromCards: () => {
    const { selectedBanks, selectedCardTypes } = get();
    return selectedBanks.length > 0 && selectedCardTypes.length > 0;
  },
  canContinueFromInterests: () => {
    const { selectedCategories, selectedBrands } = get();
    return selectedCategories.length > 0 || selectedBrands.length > 0;
  },
}));
