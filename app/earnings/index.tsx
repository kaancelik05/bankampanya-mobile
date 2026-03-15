import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { StateCard } from '@/components/common/StateCard';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useEarningsDashboard } from '@/hooks/useEarnings';

export default function EarningsScreen() {
  const { data, isLoading, isError } = useEarningsDashboard();

  if (isLoading) {
    return (
      <AppScreen>
        <AppHeader title="Kazanç Paneli" subtitle="Kazancını, bekleyen ödüllerini ve fırsat potansiyelini tek ekranda gör." />
        <StateCard title="Yükleniyor" description="Kazanç panelin hazırlanıyor..." />
      </AppScreen>
    );
  }

  if (isError || !data) {
    return (
      <AppScreen>
        <AppHeader title="Kazanç Paneli" subtitle="Kazancını, bekleyen ödüllerini ve fırsat potansiyelini tek ekranda gör." />
        <StateCard title="Kazanç paneli alınamadı" description="Panel verileri şu an yüklenemedi." tone="danger" />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <AppHeader title="Kazanç Paneli" subtitle="Kazancını, bekleyen ödüllerini ve fırsat potansiyelini tek ekranda gör." />

      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>{data.summary.monthLabel}</Text>
        <Text style={styles.heroTitle}>Bu ay kazandığın</Text>
        <Text style={styles.heroValue}>{data.summary.totalEarnedText}</Text>
        <View style={styles.heroMetaWrap}>
          <View style={styles.heroMetaCard}>
            <Text style={styles.heroMetaLabel}>Bekleyen ödül</Text>
            <Text style={styles.heroMetaValue}>{data.summary.pendingRewardText}</Text>
          </View>
          <View style={styles.heroMetaCard}>
            <Text style={styles.heroMetaLabel}>Potansiyel ek kazanç</Text>
            <Text style={styles.heroMetaValue}>{data.summary.potentialRewardText}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Özet Göstergeler</Text>
        <View style={styles.statsGrid}>
          {data.stats.map((item) => (
            <SurfaceCard key={item.id}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{item.valueText}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            </SurfaceCard>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bekleyen ve Kazanılanlar</Text>
        {data.history.map((item) => (
          <SurfaceCard key={item.id}>
            <View style={styles.historyTopRow}>
              <Text style={styles.historyBank}>{item.bankName}</Text>
              <TagPill
                tag={{
                  id: `${item.id}-${item.status}`,
                  label: item.status === 'completed' ? 'Tamamlandı' : 'Bekliyor',
                  tone: item.status === 'completed' ? 'success' : 'warning',
                }}
              />
            </View>
            <Text style={styles.historyTitle}>{item.title}</Text>
            <View style={styles.historyBottomRow}>
              <Text style={styles.historyReward}>{item.rewardText}</Text>
              <Text style={styles.historyDate}>{item.dateLabel}</Text>
            </View>
          </SurfaceCard>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Potansiyel Kazanç</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
          {data.potential.map((item) => (
            <View key={item.id} style={styles.horizontalCard}>
              <View style={styles.potentialCard}>
                <Text style={styles.historyBank}>{item.bankName}</Text>
                <Text style={styles.potentialTitle}>{item.title}</Text>
                <Text style={styles.potentialValue}>{item.potentialText}</Text>
                <Text style={styles.potentialDescription}>{item.remainingActionText}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dikkat Gerektirenler</Text>
        {data.alerts.map((item) => (
          <StateCard key={item.id} title={item.title} description={item.description} tone={item.tone === 'info' ? 'default' : item.tone} />
        ))}
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
  heroEyebrow: {
    color: '#FFB06A',
    fontSize: 13,
    fontWeight: '800',
  },
  heroTitle: {
    color: '#D6E3F5',
    fontSize: 16,
    fontWeight: '700',
  },
  heroValue: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 42,
  },
  heroMetaWrap: {
    marginTop: spacing.md,
    gap: spacing.md,
  },
  heroMetaCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  heroMetaLabel: {
    color: '#D6E3F5',
    fontSize: 13,
    fontWeight: '700',
  },
  heroMetaValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: '900',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    minWidth: 130,
    gap: spacing.xs,
  },
  statValue: {
    color: colors.navy,
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  historyTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  historyBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  historyBank: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  historyTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  historyReward: {
    color: colors.success,
    fontSize: 18,
    fontWeight: '900',
  },
  historyDate: {
    color: colors.textMuted,
    fontSize: 13,
  },
  horizontalRow: {
    gap: spacing.md,
  },
  horizontalCard: {
    width: 300,
  },
  potentialCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  potentialTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  potentialValue: {
    color: colors.success,
    fontSize: 24,
    fontWeight: '900',
  },
  potentialDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
