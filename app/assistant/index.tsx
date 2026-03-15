import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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
import { useAssistantPrompts, useAssistantResponse } from '@/hooks/useAssistant';

function resolveRoute(targetType: 'campaign' | 'tracking' | 'credit', targetId: string) {
  if (targetType === 'tracking') return `/tracking/${targetId}`;
  if (targetType === 'credit') return `/credit/${targetId}`;
  return `/campaigns/${targetId}`;
}

export default function AssistantScreen() {
  const { data: promptSuggestions = [], isLoading: promptsLoading, isError: promptsError } = useAssistantPrompts();
  const { data: response, isLoading: responseLoading, isError: responseError } = useAssistantResponse();

  if (responseLoading || promptsLoading) {
    return (
      <AppScreen>
        <AppHeader title="AI Asistan" subtitle="Doğal dilde kampanya ve finansal fırsat soruları sor." />
        <StateCard title="Yükleniyor" description="Asistan önerileri hazırlanıyor..." />
      </AppScreen>
    );
  }

  if (responseError || promptsError) {
    return (
      <AppScreen>
        <AppHeader title="AI Asistan" subtitle="Doğal dilde kampanya ve finansal fırsat soruları sor." />
        <StateCard title="Asistan verisi alınamadı" description="Öneriler şu an yüklenemedi." tone="danger" />
      </AppScreen>
    );
  }

  if (!response) {
    return (
      <AppScreen>
        <AppHeader title="AI Asistan" subtitle="Doğal dilde kampanya ve finansal fırsat soruları sor." />
        <StateCard title="Henüz öneri yok" description="Hazır sorulardan birini seçerek başlayabilirsin." tone="warning" />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <AnimatedEntrance delay={0}>
        <AppHeader title="AI Asistan" subtitle="Doğal dilde kampanya ve finansal fırsat soruları sor." />
      </AnimatedEntrance>

      <AnimatedEntrance delay={40}>
        <LinearGradient colors={[colors.navy, '#274A78']} style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroCopyWrap}>
              <Text style={styles.heroEyebrow}>Karar destek alanı</Text>
              <Text style={styles.heroTitle}>Hangi kartınla, hangi fırsatta daha fazla kazanacağını daha net öğren.</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeValue}>{response.recommendations.length}</Text>
              <Text style={styles.heroBadgeLabel}>öneri</Text>
            </View>
          </View>

          <Text style={styles.heroDescription}>AI Asistan, sorunu ürün içi fırsat ve kampanyalarla ilişkilendirerek sana aksiyon alınabilir bir öneri akışı çıkarır.</Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Aktif prompt</Text>
              <Text style={styles.heroStatValue}>1</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Yönlendirilen aksiyon</Text>
              <Text style={styles.heroStatValue}>{response.recommendations.length}</Text>
            </View>
          </View>
        </LinearGradient>
      </AnimatedEntrance>

      <AnimatedEntrance delay={90}>
        <View style={styles.inputShell}>
          <Text style={styles.inputLabel}>Sorunu yaz</Text>
          <View style={styles.inputCard}>
            <TextInput
              defaultValue={response.prompt}
              style={styles.input}
              placeholder="Örn: Akaryakıtta en çok hangi kartımla kazanırım?"
              placeholderTextColor={colors.textMuted}
            />
            <Pressable style={({ pressed }) => [styles.askButton, pressed && styles.pressablePressed]}>
              <Text style={styles.askButtonText}>Sor</Text>
            </Pressable>
          </View>
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={130}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hazır Sorular</Text>
            <Text style={styles.sectionMeta}>Hızlı başlangıç için öneriler</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promptRow}>
            {promptSuggestions.map((prompt) => (
              <Pressable key={prompt.id} style={({ pressed }) => [styles.promptCard, pressed && styles.pressablePressed]}>
                <Text style={styles.promptEyebrow}>Hazır Prompt</Text>
                <Text style={styles.promptText}>{prompt.text}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={180}>
        <LinearGradient colors={['#132B4E', '#244677']} style={styles.responseCard}>
          <View style={styles.responseTopRow}>
            <View style={styles.responseCopyWrap}>
              <Text style={styles.responseEyebrow}>Asistan özeti</Text>
              <Text style={styles.responseSummary}>{response.summary}</Text>
            </View>
            <TagPill tag={{ id: 'ai', label: 'Akıllı Öneri', tone: 'info' }} />
          </View>
          <Text style={styles.responseInsight}>{response.insight}</Text>
        </LinearGradient>
      </AnimatedEntrance>

      <AnimatedEntrance delay={230}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Önerilen Aksiyonlar</Text>
            <Text style={styles.sectionMeta}>Hemen uygulayabileceğin yönlendirmeler</Text>
          </View>
          {response.recommendations.map((recommendation) => (
            <LinearGradient key={recommendation.id} colors={['#FFFFFF', '#F7F9FC']} style={styles.recommendationCard}>
              <View style={styles.recommendationTopRow}>
                <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
                <Text style={styles.recommendationTag}>Öneri</Text>
              </View>
              <Text style={styles.recommendationSubtitle}>{recommendation.subtitle}</Text>
              <View style={styles.recommendationInfoCard}>
                <View style={styles.recommendationInfoMeta}>
                  <Text style={styles.recommendationInfoLabel}>Hedef</Text>
                  <Text style={styles.recommendationInfoValue}>{recommendation.targetType}</Text>
                </View>
                <View style={styles.recommendationInfoMetaRight}>
                  <Text style={styles.recommendationInfoLabel}>Aksiyon</Text>
                  <Text style={styles.recommendationInfoValueRight}>{recommendation.primaryActionLabel}</Text>
                </View>
              </View>
              <View style={styles.actionsRow}>
                <Pressable style={({ pressed }) => [styles.primaryAction, pressed && styles.pressablePressed]} onPress={() => router.push(resolveRoute(recommendation.targetType, recommendation.targetId) as never)}>
                  <Text style={styles.primaryActionText}>{recommendation.primaryActionLabel}</Text>
                </Pressable>
                {recommendation.secondaryActionLabel ? (
                  <Pressable style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressablePressed]} onPress={() => router.push('/tracking/add-event')}>
                    <Text style={styles.secondaryActionText}>{recommendation.secondaryActionLabel}</Text>
                  </Pressable>
                ) : null}
              </View>
            </LinearGradient>
          ))}
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
  inputShell: {
    gap: spacing.sm,
  },
  inputLabel: {
    color: colors.navy,
    fontWeight: '900',
    fontSize: 16,
  },
  inputCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.surfaceAlt,
    color: colors.navy,
    fontSize: 15,
    fontWeight: '700',
  },
  askButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  askButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
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
  sectionMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  promptRow: {
    gap: spacing.md,
  },
  promptCard: {
    width: 220,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  promptEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  promptText: {
    color: colors.navy,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '800',
  },
  responseCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  responseTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  responseCopyWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  responseEyebrow: {
    color: '#D6E3F5',
    fontWeight: '800',
    fontSize: 13,
  },
  responseSummary: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '900',
  },
  responseInsight: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 21,
  },
  recommendationCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: '#E4EAF2',
    padding: spacing.xl,
    gap: spacing.lg,
  },
  recommendationTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  recommendationTitle: {
    color: colors.navy,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '900',
    flex: 1,
  },
  recommendationTag: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  recommendationSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  recommendationInfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  recommendationInfoMeta: {
    flex: 1,
    gap: 4,
  },
  recommendationInfoMetaRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  recommendationInfoLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  recommendationInfoValue: {
    color: colors.navy,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  recommendationInfoValueRight: {
    color: colors.primary,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '900',
    textAlign: 'right',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  primaryAction: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  primaryActionText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  secondaryAction: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  secondaryActionText: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 14,
  },
});
