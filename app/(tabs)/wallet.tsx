import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedEntrance } from '@/components/common/AnimatedEntrance';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { TagPill } from '@/components/common/SurfaceCard';
import { StateCard } from '@/components/common/StateCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useWalletCards } from '@/hooks/useWallet';
import { useDeleteWalletCardMutation, useToggleWalletCardStatusMutation } from '@/hooks/useWalletMutations';

export default function WalletScreen() {
  const { data: walletCards = [], isLoading, isError } = useWalletCards();
  const toggleWalletCardStatusMutation = useToggleWalletCardStatusMutation();
  const deleteWalletCardMutation = useDeleteWalletCardMutation();

  const activeCards = walletCards.filter((card) => card.isActive).length;
  const passiveCards = walletCards.filter((card) => !card.isActive).length;

  const handleDeleteCard = (id: string, customName: string) => {
    Alert.alert('Kartı Sil', `${customName} kartını silmek istediğine emin misin? Bu işlem geri alınamaz.`, [
      { text: 'Vazgeç', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: () => deleteWalletCardMutation.mutate({ id }),
      },
    ]);
  };

  return (
    <AppScreen>
      <AnimatedEntrance delay={0}>
        <AppHeader title="Cüzdanım" subtitle="Kartlarını daha düzenli yönet, hangi kartla hangi fırsata uygun olduğunu daha net gör." showBackButton={false} />
      </AnimatedEntrance>

      <AnimatedEntrance delay={40}>
        <LinearGradient colors={[colors.navy, '#274A78']} style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroCopyWrap}>
              <Text style={styles.heroEyebrow}>Kart yönetim alanı</Text>
              <Text style={styles.heroTitle}>Kartlarını düzenle, aktif olanları öne çıkar ve fırsat eşleşmesini güçlendir.</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeValue}>{walletCards.length}</Text>
              <Text style={styles.heroBadgeLabel}>kart</Text>
            </View>
          </View>

          <Text style={styles.heroDescription}>Aktif kartların öneri motorunu besler, pasif kartların ise düzenli ve güvenli bir cüzdan görünümünde tutulur.</Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Aktif</Text>
              <Text style={styles.heroStatValue}>{activeCards}</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Pasif</Text>
              <Text style={styles.heroStatValue}>{passiveCards}</Text>
            </View>
          </View>
        </LinearGradient>
      </AnimatedEntrance>

      {isLoading ? <StateCard title="Yükleniyor" description="Kartların hazırlanıyor..." /> : null}
      {isError ? <StateCard title="Kartlar alınamadı" description="Cüzdan bilgileri şu an yüklenemedi." tone="danger" /> : null}

      <AnimatedEntrance delay={90}>
        <View style={styles.listSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Kartların</Text>
              <Text style={styles.sectionMeta}>{walletCards.length} kart listeleniyor</Text>
            </View>
            <View style={styles.infoBadge}>
              <Text style={styles.infoBadgeEyebrow}>Durum</Text>
              <Text style={styles.infoBadgeValue}>Cüzdan</Text>
            </View>
          </View>

          {walletCards.map((card, index) => {
            const isTogglePending = toggleWalletCardStatusMutation.isPending && toggleWalletCardStatusMutation.variables?.id === card.id;
            const isDeletePending = deleteWalletCardMutation.isPending && deleteWalletCardMutation.variables?.id === card.id;
            const isBusy = isTogglePending || isDeletePending;

            return (
              <AnimatedEntrance key={card.id} delay={120 + index * 40}>
                <LinearGradient colors={['#FFFFFF', '#F7F9FC']} style={styles.walletCard}>
                  <View style={styles.topRow}>
                    <View style={styles.bankWrap}>
                      <Text style={styles.bank}>{card.bankName}</Text>
                      <Text style={styles.cardMeta}>{card.cardType}</Text>
                    </View>
                    <TagPill
                      tag={{
                        id: `${card.id}-${card.isActive ? 'active' : 'inactive'}`,
                        label: card.isActive ? 'Aktif' : 'Pasif',
                        tone: card.isActive ? 'success' : 'neutral',
                      }}
                    />
                  </View>

                  <Text style={styles.cardTitle}>{card.customName}</Text>

                  <View style={styles.cardInfoPanel}>
                    <View style={styles.cardInfoBlock}>
                      <Text style={styles.cardInfoLabel}>Eşleşme etkisi</Text>
                      <Text style={styles.cardInfoValue}>{card.isActive ? 'Kampanya önerilerinde aktif kullanılır' : 'Öneri motorunda pasif tutulur'}</Text>
                    </View>
                    <View style={styles.cardInfoBlockRight}>
                      <Text style={styles.cardInfoLabel}>Durum</Text>
                      <Text style={[styles.cardInfoValueRight, card.isActive ? styles.cardInfoValueSuccess : styles.cardInfoValueMuted]}>
                        {card.isActive ? 'Kullanımda' : 'Beklemede'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardActions}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.statusButton,
                        card.isActive ? styles.statusButtonPassive : styles.statusButtonActive,
                        isBusy && styles.buttonDisabled,
                        pressed && !isBusy && styles.pressablePressed,
                      ]}
                      onPress={() => toggleWalletCardStatusMutation.mutate({ id: card.id })}
                      disabled={isBusy}
                    >
                      <Text style={[styles.statusButtonText, card.isActive ? styles.statusButtonTextPassive : styles.statusButtonTextActive]}>
                        {isTogglePending ? (card.isActive ? 'Pasif Yapılıyor...' : 'Aktif Yapılıyor...') : card.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                      </Text>
                    </Pressable>

                    {!card.isActive ? (
                      <Pressable
                        style={({ pressed }) => [styles.deleteButton, isBusy && styles.buttonDisabled, pressed && !isBusy && styles.pressablePressed]}
                        onPress={() => handleDeleteCard(card.id, card.customName)}
                        disabled={isBusy}
                      >
                        <Text style={styles.deleteButtonText}>{isDeletePending ? 'Siliniyor...' : 'Sil'}</Text>
                      </Pressable>
                    ) : null}
                  </View>
                </LinearGradient>
              </AnimatedEntrance>
            );
          })}
        </View>
      </AnimatedEntrance>

      {toggleWalletCardStatusMutation.isError ? <StateCard title="Kart durumu güncellenemedi" description="Kart durumu şu an değiştirilemedi." tone="danger" /> : null}
      {deleteWalletCardMutation.isError ? <StateCard title="Kart silinemedi" description="Kart şu an silinemedi. Aktif kartları önce pasif yapman gerekir." tone="danger" /> : null}

      <AnimatedEntrance delay={200}>
        <View style={styles.actions}>
          <Pressable style={({ pressed }) => [styles.primaryAction, pressed && styles.pressablePressed]} onPress={() => router.push('/wallet/add-card')}>
            <Text style={styles.primaryActionText}>Kart Ekle</Text>
          </Pressable>
        </View>
      </AnimatedEntrance>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  pressablePressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.96,
  },
  heroCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  heroCopyWrap: {
    flex: 1,
    gap: spacing.sm,
  },
  heroEyebrow: {
    color: '#FFB06A',
    fontSize: 13,
    fontWeight: '800',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
  },
  heroBadge: {
    minWidth: 84,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: 2,
  },
  heroBadgeValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  heroBadgeLabel: {
    color: '#D6E3F5',
    fontSize: 12,
    fontWeight: '700',
  },
  heroDescription: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 21,
  },
  heroStatsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  heroStatCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: 6,
  },
  heroStatLabel: {
    color: '#D6E3F5',
    fontSize: 12,
    fontWeight: '700',
  },
  heroStatValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  listSection: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: '900',
  },
  sectionMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  infoBadge: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: 2,
    minWidth: 96,
  },
  infoBadgeEyebrow: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  infoBadgeValue: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '900',
  },
  walletCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: '#E4EAF2',
    padding: spacing.xl,
    gap: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  bankWrap: {
    flex: 1,
    gap: 2,
  },
  bank: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
  cardMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  cardTitle: {
    color: colors.navy,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
  },
  cardInfoPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  cardInfoBlock: {
    flex: 1,
    gap: 4,
  },
  cardInfoBlockRight: {
    width: 96,
    gap: 4,
    alignItems: 'flex-end',
  },
  cardInfoLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  cardInfoValue: {
    color: colors.navy,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  cardInfoValueRight: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '900',
    textAlign: 'right',
  },
  cardInfoValueSuccess: {
    color: colors.success,
  },
  cardInfoValueMuted: {
    color: colors.textMuted,
  },
  cardActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statusButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  statusButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  statusButtonPassive: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '800',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  statusButtonTextPassive: {
    color: colors.navy,
  },
  deleteButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#F6C8C8',
    backgroundColor: '#FDECEC',
  },
  deleteButtonText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '800',
  },
  buttonDisabled: {
    opacity: 0.6,
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
});
