import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

type ProgressStepsProps = {
  current: number;
  total: number;
  title?: string;
};

export function ProgressSteps({ current, total, title }: ProgressStepsProps) {
  return (
    <View style={styles.wrapper}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.row}>
        {Array.from({ length: total }).map((_, index) => {
          const done = index < current;
          return <View key={index} style={[styles.dot, done && styles.dotDone]} />;
        })}
      </View>
      <Text style={styles.label}>{current} / {total} adım tamamlandı</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
    ...shadows.card,
  },
  title: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    flex: 1,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  dotDone: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
});
