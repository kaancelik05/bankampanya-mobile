import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

type StateCardProps = {
  title: string;
  description: string;
  tone?: 'default' | 'warning' | 'danger';
};

export function StateCard({ title, description, tone = 'default' }: StateCardProps) {
  const toneStyles = {
    default: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      titleColor: colors.navy,
      textColor: colors.textMuted,
    },
    warning: {
      backgroundColor: '#FFF6E8',
      borderColor: '#FFE3B3',
      titleColor: colors.warning,
      textColor: '#9A6700',
    },
    danger: {
      backgroundColor: '#FDECEC',
      borderColor: '#F6C8C8',
      titleColor: colors.danger,
      textColor: '#9F1D1D',
    },
  } as const;

  const currentTone = toneStyles[tone];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTone.backgroundColor,
          borderColor: currentTone.borderColor,
        },
      ]}
    >
      <Text style={[styles.title, { color: currentTone.titleColor }]}>{title}</Text>
      <Text style={[styles.description, { color: currentTone.textColor }]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
  },
});
