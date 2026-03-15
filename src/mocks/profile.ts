export const userProfile = {
  fullName: 'Kaan Çelik',
  email: 'kaan@example.com',
  phone: '+90 555 000 00 00',
  joinedLabel: 'Nisan 2026’dan beri üye',
  totalCards: 5,
  activeTrackingCount: 2,
  monthlyPotentialText: '1.450 TL',
};

export const profileMenuGroups = [
  {
    id: 'financial',
    title: 'Finans ve Fırsatlar',
    items: [
      {
        id: 'profile-earnings',
        title: 'Kazanç Paneli',
        description: 'Toplam kazanımını, bekleyen ödüllerini ve fırsat potansiyelini görüntüle.',
        route: '/earnings',
      },
      {
        id: 'profile-wallet',
        title: 'Kartlarını Yönet',
        description: 'Kayıtlı bankalarını ve kart türlerini güncelle.',
        route: '/wallet',
      },
      {
        id: 'profile-notifications',
        title: 'Bildirimler',
        description: 'Fırsat ve takip bildirimlerini gözden geçir.',
        route: '/notifications',
      },
    ],
  },
  {
    id: 'account',
    title: 'Hesap ve Güvenlik',
    items: [
      {
        id: 'profile-security',
        title: 'Güvenlik',
        description: 'Şifre ve oturum ayarlarını yönet.',
      },
    ],
  },
  {
    id: 'support',
    title: 'Destek',
    items: [
      {
        id: 'profile-support',
        title: 'Yardım ve Destek',
        description: 'Sık sorulan sorular ve destek kanalları.',
      },
    ],
  },
];

export const profileMenuItems = profileMenuGroups.flatMap((group) => group.items);
