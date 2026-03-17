import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

type SecondaryButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  testID?: string;
  accessibilityLabel?: string;
};

export function SecondaryButton({ label, onPress, disabled = false, testID, accessibilityLabel }: SecondaryButtonProps) {
  return (
    <Pressable
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      style={({ pressed }) => [styles.button, disabled && styles.buttonDisabled, pressed && !disabled && styles.buttonPressed]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
  buttonPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  text: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  textDisabled: {
    color: colors.textMuted,
  },
});
