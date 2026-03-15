import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { successState } from '@/mocks/success';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export default function SuccessScreen() {
  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Başarı</Text>
        <Text style={styles.title}>{successState.title}</Text>
        <Text style={styles.subtitle}>{successState.subtitle}</Text>
        <View style={styles.rewardRow}>
          <Text style={styles.rewardLabel}>Beklenen Ödül</Text>
          <Text style={styles.rewardValue}>{successState.rewardText}</Text>
        </View>
      </View>

      <SurfaceCard>
        <View style={styles.statusRow}>
          <Text style={styles.sectionTitle}>Durum Özeti</Text>
          <TagPill
            tag={{
              id: successState.status,
              label: successState.status === 'reward_pending' ? 'Ödül Bekleniyor' : 'Tamamlandı',
              tone: successState.status === 'reward_pending' ? 'warning' : 'success',
            }}
          />
        </View>

        <View style={styles.summaryList}>
          {successState.summaryItems.map((item) => (
            <View key={item.id} style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{item.label}</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </SurfaceCard>

      <View style={styles.actions}>
        <Pressable style={styles.primaryAction} onPress={() => router.push('/tracking')}>
          <Text style={styles.primaryActionText}>{successState.primaryActionLabel}</Text>
        </Pressable>
        <Pressable style={styles.secondaryAction} onPress={() => router.push('/discover')}>
          <Text style={styles.secondaryActionText}>{successState.secondaryActionLabel}</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.navy,
    borderRadius: radius.xl,
    padding: spacing['2xl'],
    gap: spacing.sm,
  },
  eyebrow: {
    color: '#FFB06A',
    fontWeight: '800',
    fontSize: 13,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  subtitle: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 20,
  },
  rewardRow: {
    marginTop: spacing.md,
    gap: 4,
  },
  rewardLabel: {
    color: '#D6E3F5',
    fontSize: 13,
    fontWeight: '700',
  },
  rewardValue: {
    color: '#8FF0A4',
    fontSize: 30,
    fontWeight: '900',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '900',
  },
  summaryList: {
    gap: spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 14,
  },
  summaryValue: {
    color: colors.navy,
    fontSize: 15,
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
  secondaryAction: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  secondaryActionText: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 16,
  },
});
