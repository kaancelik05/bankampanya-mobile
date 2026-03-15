import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
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
      <AppHeader title="Cüzdanım" subtitle="Kartlarını yönet, sana uygun fırsatları daha doğru gösterelim." showBackButton={false} />

      {isLoading ? <StateCard title="Yükleniyor" description="Kartların hazırlanıyor..." /> : null}
      {isError ? <StateCard title="Kartlar alınamadı" description="Cüzdan bilgileri şu an yüklenemedi." tone="danger" /> : null}

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

            <View style={styles.cardActions}>
              <Pressable
                style={[styles.statusButton, card.isActive ? styles.statusButtonPassive : styles.statusButtonActive]}
                onPress={() => toggleWalletCardStatusMutation.mutate({ id: card.id })}
              >
                <Text style={[styles.statusButtonText, card.isActive ? styles.statusButtonTextPassive : styles.statusButtonTextActive]}>
                  {card.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                </Text>
              </Pressable>

              {!card.isActive ? (
                <Pressable style={styles.deleteButton} onPress={() => handleDeleteCard(card.id, card.customName)}>
                  <Text style={styles.deleteButtonText}>Sil</Text>
                </Pressable>
              ) : null}
            </View>
          </SurfaceCard>
        ))}
      </View>

      {toggleWalletCardStatusMutation.isError ? (
        <StateCard title="Kart durumu güncellenemedi" description="Kart durumu şu an değiştirilemedi." tone="danger" />
      ) : null}
      {deleteWalletCardMutation.isError ? (
        <StateCard title="Kart silinemedi" description="Kart şu an silinemedi. Aktif kartları önce pasif yapman gerekir." tone="danger" />
      ) : null}

      <View style={styles.actions}>
        <Pressable style={styles.primaryAction} onPress={() => router.push('/wallet/add-card')}>
          <Text style={styles.primaryActionText}>Kart Ekle</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
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
  cardActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  statusButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  statusButtonActive: {
    backgroundColor: colors.primarySoft,
    borderColor: '#FFD6B0',
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
    color: colors.primary,
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
