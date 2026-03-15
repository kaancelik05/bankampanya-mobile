import { router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BrandMark } from '@/components/common/BrandMark';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

type HeaderAction = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  badgeCount?: number;
};

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightActions?: HeaderAction[];
};

const defaultActions: HeaderAction[] = [
  {
    icon: 'sparkles-outline',
    label: 'AI Arama',
    onPress: () => router.push('/assistant'),
  },
  {
    icon: 'notifications-outline',
    label: 'Bildirimler',
    onPress: () => router.push('/notifications'),
  },
  {
    icon: 'person-circle-outline',
    label: 'Profil',
    onPress: () => router.push('/profile'),
  },
];

export function AppHeader({ title, subtitle, showBackButton = true, rightActions }: AppHeaderProps) {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const providedActions = rightActions;
  const mergedActions =
    providedActions !== undefined
      ? providedActions.length > 0
        ? defaultActions.filter((defaultAction) => !providedActions.some((action) => action.label === defaultAction.label)).concat(providedActions)
        : []
      : defaultActions;
  const shouldShowBackButton = showBackButton && canGoBack;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['rgba(255,255,255,0.98)', '#F7F9FC']} style={styles.shell}>
        <View style={styles.topRow}>
          <View style={styles.leftGroup}>
            {shouldShowBackButton ? (
              <Pressable style={({ pressed }) => [styles.backButton, pressed && styles.pressed]} onPress={() => router.back()} accessibilityLabel="Geri">
                <Ionicons name="chevron-back" size={18} color={colors.primary} />
              </Pressable>
            ) : null}
            <View style={styles.brandWrap}>
              <BrandMark />
            </View>
          </View>

          <View style={styles.actionsRow}>
            {mergedActions.map((action, index) => {
              const isPrimary = index === 0;

              return (
                <Pressable key={action.label} style={({ pressed }) => [styles.iconButton, isPrimary && styles.iconButtonPrimary, pressed && styles.pressed]} onPress={action.onPress} accessibilityLabel={action.label}>
                  {isPrimary ? (
                    <LinearGradient colors={[colors.primary, '#FF9A42']} style={styles.iconButtonGradient}>
                      <Ionicons name={action.icon} size={18} color="#FFFFFF" />
                    </LinearGradient>
                  ) : (
                    <View style={styles.iconButtonInner}>
                      <Ionicons name={action.icon} size={18} color={colors.navy} />
                    </View>
                  )}

                  {action.badgeCount ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{action.badgeCount > 9 ? '9+' : action.badgeCount}</Text>
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.copyBlock}>
          <View style={styles.titleRow}>
            <View style={styles.titleAccent} />
            <Text style={styles.title}>{title}</Text>
          </View>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  shell: {
    borderRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    gap: spacing.md,
    shadowColor: '#0F1A2B',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  topRow: {
    minHeight: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
  },
  brandWrap: {
    paddingRight: spacing.xs,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: '#FFD6B0',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginLeft: spacing.md,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  iconButtonInner: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  iconButtonPrimary: {
    borderColor: 'transparent',
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  iconButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
  },
  copyBlock: {
    gap: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  titleAccent: {
    width: 6,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: typography.h1,
    color: colors.navy,
    fontWeight: '900',
    lineHeight: 32,
    flexShrink: 1,
  },
  subtitle: {
    fontSize: typography.bodySm,
    color: colors.textMuted,
    lineHeight: 22,
    maxWidth: 520,
    paddingLeft: 16,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
});
