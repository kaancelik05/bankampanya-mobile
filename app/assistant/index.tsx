import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
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
      <AppHeader title="AI Asistan" subtitle="Doğal dilde kampanya ve finansal fırsat soruları sor." />

      <SurfaceCard>
        <Text style={styles.inputLabel}>Sorunu yaz</Text>
        <TextInput
          defaultValue={response.prompt}
          style={styles.input}
          placeholder="Örn: Akaryakıtta en çok hangi kartımla kazanırım?"
          placeholderTextColor={colors.textMuted}
        />
      </SurfaceCard>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hazır Sorular</Text>
        <View style={styles.promptWrap}>
          {promptSuggestions.map((prompt) => (
            <View key={prompt.id} style={styles.promptChip}>
              <Text style={styles.promptChipText}>{prompt.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <SurfaceCard>
        <View style={styles.responseTopRow}>
          <Text style={styles.responseTitle}>Asistan Önerisi</Text>
          <TagPill tag={{ id: 'ai', label: 'Akıllı Öneri', tone: 'info' }} />
        </View>
        <Text style={styles.responseSummary}>{response.summary}</Text>
        <Text style={styles.responseInsight}>{response.insight}</Text>
      </SurfaceCard>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Önerilen Aksiyonlar</Text>
        {response.recommendations.map((recommendation) => (
          <SurfaceCard key={recommendation.id}>
            <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
            <Text style={styles.recommendationSubtitle}>{recommendation.subtitle}</Text>
            <View style={styles.actionsRow}>
              <Pressable style={styles.primaryAction} onPress={() => router.push(resolveRoute(recommendation.targetType, recommendation.targetId) as never)}>
                <Text style={styles.primaryActionText}>{recommendation.primaryActionLabel}</Text>
              </Pressable>
              {recommendation.secondaryActionLabel ? (
                <Pressable style={styles.secondaryAction} onPress={() => router.push('/tracking/add-event')}>
                  <Text style={styles.secondaryActionText}>{recommendation.secondaryActionLabel}</Text>
                </Pressable>
              ) : null}
            </View>
          </SurfaceCard>
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
    marginBottom: spacing.sm,
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
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: '900',
  },
  promptWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  promptChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  promptChipText: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  responseTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  responseTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '900',
  },
  responseSummary: {
    color: colors.navy,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  responseInsight: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  recommendationTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 8,
  },
  recommendationSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
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
