import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useWalletCards } from '@/hooks/useWallet';

export default function WalletScreen() {
  const { data: walletCards = [] } = useWalletCards();

  return (
    <AppScreen>
      <AppHeader title="Cüzdanım" subtitle="Kartlarını yönet, sana uygun fırsatları daha doğru gösterelim." />

      <SurfaceCard>
        <Text style={styles.summaryTitle}>Kayıtlı Kart Sayısı: {walletCards.length}</Text>
        <Text style={styles.summaryText}>Aktif kartların, kişiselleştirilmiş kampanya önerilerinin temelini oluşturur.</Text>
      </SurfaceCard>

      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Kartların</Text>
        {walletCards.map((card) => (
          <SurfaceCard key={card.id}>
            <View style={styles.topRow}>
              <Text style={styles.bank}>{card.bankName}</Text>
              <TagPill
                tag={{
                  id: `${card.id}-${card.isActive ? 'active' : 'inactive'}`,
                  label: card.isActive ? 'Aktif' : 'Pasif',
                  tone: card.isActive ? 'success' : 'neutral',
                }}
              />
            </View>
            <Text style={styles.cardTitle}>{card.customName}</Text>
            <Text style={styles.cardMeta}>{card.cardType}</Text>
          </SurfaceCard>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.primaryAction} onPress={() => router.push('/wallet/add-card')}>
          <Text style={styles.primaryActionText}>Kart Ekle</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/profile')}>
          <Text style={styles.link}>Profil ve Ayarlar</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  summaryTitle: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  summaryText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  listSection: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: '900',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  bank: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  cardTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  cardMeta: {
    color: colors.textMuted,
    fontSize: 14,
  },
  actions: {
    gap: spacing.md,
  },
  primaryAction: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  link: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});
