import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  testID?: string;
  accessibilityLabel?: string;
};

export function PrimaryButton({ label, onPress, disabled = false, testID, accessibilityLabel }: PrimaryButtonProps) {
  return (
    <Pressable
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      style={({ pressed }) => [styles.button, pressed && !disabled && styles.buttonPressed, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
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
    backgroundColor: '#F5B882',
  },
  text: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  textDisabled: {
    opacity: 0.9,
  },
});
