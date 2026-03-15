export type ProfileMenuItem = {
  id: string;
  title: string;
  description: string;
  route?: string;
};

export type WalletCard = {
  id: string;
  bankName: string;
  cardType: string;
  customName: string;
  isActive: boolean;
};

export type UserProfile = {
  fullName: string;
  email: string;
  phone: string;
  joinedLabel: string;
  totalCards: number;
  activeTrackingCount: number;
  monthlyPotentialText: string;
};
