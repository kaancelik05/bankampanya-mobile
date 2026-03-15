import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AnimatedEntrance } from '@/components/common/AnimatedEntrance';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { StateCard } from '@/components/common/StateCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useProfileMenuGroups, useUserProfile } from '@/hooks/useProfile';

export default function ProfileScreen() {
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

      <AnimatedEntrance delay={50}>
        <View style={styles.hero}>
          <Text style={styles.heroName}>{userProfile.fullName}</Text>
          <Text style={styles.heroMeta}>{userProfile.email}</Text>
          <Text style={styles.heroMeta}>{userProfile.phone}</Text>
          <Text style={styles.joinedText}>{userProfile.joinedLabel}</Text>
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={100}>
        <SurfaceCard>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.totalCards}</Text>
              <Text style={styles.statLabel}>Kart</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.activeTrackingCount}</Text>
              <Text style={styles.statLabel}>Aktif Takip</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.monthlyPotentialText}</Text>
              <Text style={styles.statLabel}>Potansiyel</Text>
            </View>
          </View>
        </SurfaceCard>
      </AnimatedEntrance>

      {profileMenuGroups.map((group, groupIndex) => (
        <AnimatedEntrance key={group.id} delay={150 + groupIndex * 45}>
          <View style={styles.listSection}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            {group.items.map((item) => {
              const itemRoute = 'route' in item ? item.route : undefined;

              return (
                <Pressable key={item.id} style={({ pressed }) => [pressed && styles.pressablePressed]} onPress={() => (itemRoute ? router.push(itemRoute as never) : undefined)}>
                  <SurfaceCard>
                    <View style={styles.itemTopRow}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {itemRoute ? <TagPill tag={{ id: item.id, label: 'Aç', tone: 'info' }} /> : null}
                    </View>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </SurfaceCard>
                </Pressable>
              );
            })}
          </View>
        </AnimatedEntrance>
      ))}

      <AnimatedEntrance delay={320}>
        <Pressable style={({ pressed }) => [styles.logoutButton, pressed && styles.pressablePressed]}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </Pressable>
      </AnimatedEntrance>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.navy,
    borderRadius: radius.xl,
    padding: spacing['2xl'],
    gap: spacing.sm,
  },
  heroName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
  },
  heroMeta: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 20,
  },
  joinedText: {
    color: '#FFB06A',
    fontSize: 13,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  statItem: {
    flex: 1,
    gap: 4,
  },
  statValue: {
    color: colors.navy,
    fontSize: 18,
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
  sectionTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '900',
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  itemTitle: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: '800',
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
  pressablePressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.96,
  },
});
