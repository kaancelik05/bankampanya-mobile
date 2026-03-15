import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

type SecondaryButtonProps = {
  label: string;
  onPress?: () => void;
};

export function SecondaryButton({ label, onPress }: SecondaryButtonProps) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
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
  text: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
