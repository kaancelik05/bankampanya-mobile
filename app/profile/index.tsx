import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedEntrance } from '@/components/common/AnimatedEntrance';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { TagPill } from '@/components/common/SurfaceCard';
import { StateCard } from '@/components/common/StateCard';
import { useAuthStore } from '@/store/auth-store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useProfileMenuGroups, useUserProfile } from '@/hooks/useProfile';

export default function ProfileScreen() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { data: userProfile, isLoading: userLoading, isError: userError } = useUserProfile();
  const { data: profileMenuGroups = [], isLoading: menuLoading, isError: menuError } = useProfileMenuGroups();

  if (userLoading || menuLoading) {
    return (
      <AppScreen>
        <AppHeader title="Profil" subtitle="Kullanıcı ayarları ve hesap yönetimi." />
        <StateCard title="Yükleniyor" description="Profil bilgilerin hazırlanıyor..." />
      </AppScreen>
    );
  }

  if (userError || menuError) {
    return (
      <AppScreen>
        <AppHeader title="Profil" subtitle="Kullanıcı ayarları ve hesap yönetimi." />
        <StateCard title="Profil yüklenemedi" description="Bilgiler şu an alınamadı." tone="danger" />
      </AppScreen>
    );
  }

  if (!userProfile) {
    return (
      <AppScreen>
        <AppHeader title="Profil" subtitle="Kullanıcı ayarları ve hesap yönetimi." />
        <StateCard title="Profil bulunamadı" description="Kullanıcı bilgisi şu an görüntülenemiyor." tone="warning" />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <AnimatedEntrance delay={0}>
        <AppHeader title="Profil" subtitle="Kullanıcı ayarları ve hesap yönetimi." />
      </AnimatedEntrance>

      <AnimatedEntrance delay={40}>
        <LinearGradient colors={[colors.navy, '#274A78']} style={styles.hero}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroCopyWrap}>
              <Text style={styles.heroEyebrow}>Hesap merkezi</Text>
              <Text style={styles.heroName}>{userProfile.fullName}</Text>
              <Text style={styles.heroMeta}>{userProfile.email}</Text>
              <Text style={styles.heroMeta}>{userProfile.phone}</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeValue}>{userProfile.totalCards}</Text>
              <Text style={styles.heroBadgeLabel}>kart</Text>
            </View>
          </View>
          <Text style={styles.joinedText}>{userProfile.joinedLabel}</Text>
        </LinearGradient>
      </AnimatedEntrance>

      <AnimatedEntrance delay={90}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userProfile.totalCards}</Text>
            <Text style={styles.statLabel}>Kart</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userProfile.activeTrackingCount}</Text>
            <Text style={styles.statLabel}>Aktif Takip</Text>
          </View>
          <View style={styles.statCardWide}>
            <Text style={styles.statValue}>{userProfile.monthlyPotentialText}</Text>
            <Text style={styles.statLabel}>Aylık Potansiyel</Text>
          </View>
        </View>
      </AnimatedEntrance>

      {profileMenuGroups.map((group, groupIndex) => (
        <AnimatedEntrance key={group.id} delay={140 + groupIndex * 45}>
          <View style={styles.listSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{group.title}</Text>
              <Text style={styles.sectionMeta}>{group.items.length} başlık</Text>
            </View>
            {group.items.map((item) => {
              const itemRoute = 'route' in item ? item.route : undefined;

              return (
                <Pressable key={item.id} style={({ pressed }) => [pressed && styles.pressablePressed]} onPress={() => (itemRoute ? router.push(itemRoute as never) : undefined)}>
                  <LinearGradient colors={['#FFFFFF', '#F7F9FC']} style={styles.itemCard}>
                    <View style={styles.itemTopRow}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {itemRoute ? <TagPill tag={{ id: item.id, label: 'Aç', tone: 'info' }} /> : null}
                    </View>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </LinearGradient>
                </Pressable>
              );
            })}
          </View>
        </AnimatedEntrance>
      ))}

      <AnimatedEntrance delay={320}>
        <Pressable
          testID="profile-logout"
          accessibilityLabel="Çıkış Yap"
          accessibilityRole="button"
          style={({ pressed }) => [styles.logoutButton, pressed && styles.pressablePressed]}
          onPress={() => {
            void clearAuth().then(() => router.replace('/(auth)/login'));
          }}
        >
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </Pressable>
      </AnimatedEntrance>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  pressablePressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.96,
  },
  hero: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  heroCopyWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  heroEyebrow: {
    color: '#FFB06A',
    fontSize: 13,
    fontWeight: '800',
  },
  heroName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
  },
  heroMeta: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 20,
  },
  heroBadge: {
    minWidth: 84,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: 2,
  },
  heroBadgeValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  heroBadgeLabel: {
    color: '#D6E3F5',
    fontSize: 12,
    fontWeight: '700',
  },
  joinedText: {
    color: '#FFB06A',
    fontSize: 13,
    fontWeight: '800',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    flexBasis: '47%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: 4,
  },
  statCardWide: {
    width: '100%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: 4,
  },
  statValue: {
    color: colors.navy,
    fontSize: 22,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  listSection: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '900',
  },
  sectionMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  itemCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: '#E4EAF2',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
  },
  itemDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: '#FDECEC',
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.danger,
    fontWeight: '800',
    fontSize: 16,
  },
});
