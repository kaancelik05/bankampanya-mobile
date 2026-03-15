import { router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
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
      <View style={styles.topRow}>
        <View style={styles.leftGroup}>
          {shouldShowBackButton ? (
            <Pressable style={styles.backButton} onPress={() => router.back()} accessibilityLabel="Geri">
              <Ionicons name="chevron-back" size={18} color={colors.primary} />
            </Pressable>
          ) : null}
          <BrandMark />
        </View>

        <View style={styles.actionsRow}>
          {mergedActions.map((action) => (
            <Pressable key={action.label} style={styles.iconButton} onPress={action.onPress} accessibilityLabel={action.label}>
              <Ionicons name={action.icon} size={20} color={colors.navy} />
              {action.badgeCount ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{action.badgeCount > 9 ? '9+' : action.badgeCount}</Text>
                </View>
              ) : null}
            </Pressable>
          ))}
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  topRow: {
    minHeight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginLeft: spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
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
