import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';
import type { CampaignTag } from '@/types/campaign';

const toneStyles = {
  success: {
    backgroundColor: colors.successSoft,
    color: colors.success,
  },
  warning: {
    backgroundColor: colors.primarySoft,
    color: colors.primary,
  },
  info: {
    backgroundColor: colors.navySoft,
    color: colors.navy,
  },
  neutral: {
    backgroundColor: colors.surfaceAlt,
    color: colors.textMuted,
  },
} as const;

export function TagPill({ tag }: { tag: CampaignTag }) {
  const tone = toneStyles[tag.tone];

  return (
    <View style={[styles.pill, { backgroundColor: tone.backgroundColor }]}> 
      <Text style={[styles.text, { color: tone.color }]}>{tag.label}</Text>
    </View>
  );
}

export function SurfaceCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    ...shadows.card,
  },
});
