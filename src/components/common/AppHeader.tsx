import { router, useNavigation } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  showBackButton?: boolean;
};

export function AppHeader({
  title,
  subtitle,
  eyebrow = 'Bankampanya',
  showBackButton = true,
}: AppHeaderProps) {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.container}>
      {showBackButton && canGoBack ? (
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Geri</Text>
        </Pressable>
      ) : null}
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
  },
  backButtonText: {
    fontSize: typography.bodySm,
    color: colors.primary,
    fontWeight: '800',
  },
  eyebrow: {
    fontSize: typography.caption,
    color: colors.primary,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: typography.h1,
    color: colors.navy,
    fontWeight: '900',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: typography.bodySm,
    color: colors.textMuted,
    lineHeight: 22,
    maxWidth: 520,
  },
});
