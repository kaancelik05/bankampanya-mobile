import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

type AppInputProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  helperText?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  testID?: string;
  accessibilityLabel?: string;
};

export function AppInput({ label, helperText, multiline, ...props }: AppInputProps) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.wrapper, multiline && styles.wrapperMultiline]}>
        <TextInput
          testID={props.testID}
          accessibilityLabel={props.accessibilityLabel ?? label ?? props.placeholder}
          placeholderTextColor={colors.textMuted}
          style={[styles.input, multiline && styles.inputMultiline]}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          {...props}
        />
      </View>
      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 14,
  },
  wrapper: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    minHeight: 56,
    justifyContent: 'center',
  },
  wrapperMultiline: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    justifyContent: 'flex-start',
  },
  input: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  inputMultiline: {
    minHeight: 96,
  },
  helper: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});
