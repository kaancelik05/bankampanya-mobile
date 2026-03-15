import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { AnimatedEntrance } from '@/components/common/AnimatedEntrance';
import { StateCard } from '@/components/common/StateCard';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useEarningsDashboard } from '@/hooks/useEarnings';

function resolveStatToneColors(tone?: 'default' | 'success' | 'warning' | 'info') {
  if (tone === 'success') {
    return {
      surface: colors.successSoft,
      border: '#CBEFD7',
      value: colors.success,
      accent: '#8ED7A6',
    };
  }

  if (tone === 'warning') {
    return {
      surface: '#FFF6E8',
      border: '#FFE3B3',
      value: colors.warning,
      accent: '#FFD089',
    };
  }

  if (tone === 'info') {
    return {
      surface: colors.navySoft,
      border: '#D4E0F1',
      value: colors.navy,
      accent: '#9CB7DA',
    };
  }

  return {
    surface: colors.surface,
    border: colors.border,
    value: colors.navy,
    accent: '#D8E0EC',
  };
}

const earningsTrend = [48, 62, 55, 74, 69, 88, 96];
const earningTrendLabels = ['Pzt', 'Sal', 'Çrş', 'Prş', 'Cum', 'Cmt', 'Paz'];

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
      <AnimatedEntrance delay={0}>
        <AppHeader title="Kazanç Paneli" subtitle="Kazancını, bekleyen ödüllerini ve fırsat potansiyelini tek ekranda gör." />
      </AnimatedEntrance>

      <AnimatedEntrance delay={40}>
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>{data.summary.monthLabel}</Text>
          <Text style={styles.heroTitle}>Bu ay kazandığın</Text>
          <Text style={styles.heroValue}>{data.summary.totalEarnedText}</Text>

          <View style={styles.chartCard}>
            <View style={styles.chartTopRow}>
              <Text style={styles.chartTitle}>Haftalık Kazanç Eğilimi</Text>
              <Text style={styles.chartValue}>+18%</Text>
            </View>
            <View style={styles.chartBarsRow}>
              {earningsTrend.map((point, index) => (
                <View key={`${point}-${index}`} style={styles.chartColumn}>
                  <View style={styles.chartTrack}>
                    <View style={[styles.chartBar, { height: `${point}%` }]} />
                  </View>
                  <Text style={styles.chartLabel}>{earningTrendLabels[index]}</Text>
                </View>
              ))}
            </View>
          </View>

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
      </AnimatedEntrance>

      <AnimatedEntrance delay={90}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Özet Göstergeler</Text>
          <View style={styles.statsGrid}>
            {data.stats.map((item) => {
              const toneColors = resolveStatToneColors(item.tone);

              return (
                <View
                  key={item.id}
                  style={[
                    styles.statTile,
                    {
                      backgroundColor: toneColors.surface,
                      borderColor: toneColors.border,
                    },
                  ]}
                >
                  <View style={[styles.statAccent, { backgroundColor: toneColors.accent }]} />
                  <Text style={[styles.statValue, { color: toneColors.value }]}>{item.valueText}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={140}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bekleyen ve Kazanılanlar</Text>
            <Text style={styles.sectionHint}>Son hareketler</Text>
          </View>
          {data.history.map((item) => (
            <View key={item.id} style={styles.historyCard}>
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
            </View>
          ))}
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={190}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Potansiyel Kazanç</Text>
            <Text style={styles.sectionHint}>En yüksek fırsatlar</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
            {data.potential.map((item) => (
              <View key={item.id} style={styles.horizontalCard}>
                <View style={styles.potentialCard}>
                  <Text style={styles.historyBank}>{item.bankName}</Text>
                  <Text style={styles.potentialTitle}>{item.title}</Text>
                  <Text style={styles.potentialValue}>{item.potentialText}</Text>
                  <View style={styles.potentialActionBox}>
                    <Text style={styles.potentialActionLabel}>Kalan adım</Text>
                    <Text style={styles.potentialDescription}>{item.remainingActionText}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={240}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dikkat Gerektirenler</Text>
            <Text style={styles.sectionHint}>Hızlı aksiyon önerileri</Text>
          </View>
          {data.alerts.map((item) => (
            <View key={item.id} style={styles.alertCardWrap}>
              <StateCard title={item.title} description={item.description} tone={item.tone === 'info' ? 'default' : item.tone} />
            </View>
          ))}
        </View>
      </AnimatedEntrance>
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
  chartCard: {
    marginTop: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  chartTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartTitle: {
    color: '#D6E3F5',
    fontSize: 13,
    fontWeight: '700',
  },
  chartValue: {
    color: '#8FF0A4',
    fontSize: 14,
    fontWeight: '900',
  },
  chartBarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.sm,
    height: 120,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  chartTrack: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.pill,
    padding: 4,
  },
  chartBar: {
    width: '100%',
    backgroundColor: '#8FF0A4',
    borderRadius: radius.pill,
    minHeight: 12,
  },
  chartLabel: {
    color: '#D6E3F5',
    fontSize: 11,
    fontWeight: '700',
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
  sectionHint: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statTile: {
    flexBasis: '47%',
    minHeight: 128,
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  statAccent: {
    width: 44,
    height: 6,
    borderRadius: radius.pill,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    maxWidth: 120,
  },
  historyCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  historyTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
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
    lineHeight: 24,
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
    lineHeight: 24,
  },
  potentialValue: {
    color: colors.success,
    fontSize: 24,
    fontWeight: '900',
  },
  potentialActionBox: {
    marginTop: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  potentialActionLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  potentialDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  alertCardWrap: {
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
});
