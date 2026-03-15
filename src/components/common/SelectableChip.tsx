import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';

type SelectableChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  variant?: 'pill' | 'tile';
  helperText?: string;
};

export function SelectableChip({
  label,
  active = false,
  onPress,
  variant = 'pill',
  helperText,
}: SelectableChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        variant === 'tile' ? styles.tile : styles.pill,
        active && styles.active,
      ]}
    >
      <View style={styles.labelRow}>
        <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
        {active ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
      {helperText ? <Text style={[styles.helper, active && styles.activeHelper]}>{helperText}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
  },
  tile: {
    minWidth: '47%',
    padding: spacing.lg,
    borderRadius: radius.lg,
    gap: 6,
    ...shadows.card,
  },
  active: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
    flexShrink: 1,
  },
  helper: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  activeLabel: {
    color: colors.primary,
  },
  activeHelper: {
    color: colors.navy,
  },
  checkmark: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
  },
});
