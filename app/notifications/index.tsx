import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedEntrance } from '@/components/common/AnimatedEntrance';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { TagPill } from '@/components/common/SurfaceCard';
import { StateCard } from '@/components/common/StateCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useNotificationsList } from '@/hooks/useNotifications';

export default function NotificationsScreen() {
  const { data: notifications = [], isLoading, isError } = useNotificationsList();

  return (
    <AppScreen>
      <AnimatedEntrance delay={0}>
        <AppHeader title="Bildirimler" subtitle="Fırsat, takip ve işlem güncellemeleri burada listelenir." showBackButton={false} />
      </AnimatedEntrance>

      <AnimatedEntrance delay={40}>
        <LinearGradient colors={[colors.navy, '#274A78']} style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroCopyWrap}>
              <Text style={styles.heroEyebrow}>Güncelleme merkezi</Text>
              <Text style={styles.heroTitle}>Fırsat ve takip bildirimlerini tek akışta daha rahat yönet.</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeValue}>{notifications.length}</Text>
              <Text style={styles.heroBadgeLabel}>bildirim</Text>
            </View>
          </View>
          <Text style={styles.heroDescription}>Önemli kampanya değişiklikleri, son gün hatırlatmaları ve aksiyon gerektiren güncellemeleri öne çıkarıyoruz.</Text>
        </LinearGradient>
      </AnimatedEntrance>

      {isLoading ? <StateCard title="Yükleniyor" description="Bildirimlerin hazırlanıyor..." /> : null}
      {isError ? <StateCard title="Bildirimler alınamadı" description="Şu an bildirimler yüklenemedi." tone="danger" /> : null}
      {!isLoading && !isError && notifications.length === 0 ? (
        <AnimatedEntrance delay={90}>
          <View style={styles.emptyWrap}>
            <StateCard title="Bildirimin yok" description="Yeni fırsat veya takip güncellemesi olduğunda burada göreceksin." tone="warning" />
            <Pressable style={({ pressed }) => [styles.emptyAction, pressed && styles.pressablePressed]} onPress={() => router.push('/(tabs)/for-you')}>
              <Text style={styles.emptyActionText}>Senin İçin'e Git</Text>
            </Pressable>
          </View>
        </AnimatedEntrance>
      ) : null}

      <View style={styles.list}>
        {notifications.map((item, index) => (
          <AnimatedEntrance key={item.id} delay={120 + index * 40}>
            <LinearGradient colors={['#FFFFFF', '#F7F9FC']} style={styles.notificationCard}>
              <View style={styles.topRow}>
                <View style={styles.metaWrap}>
                  <Text style={styles.time}>{item.timeLabel}</Text>
                  <Text style={styles.orderLabel}>Bildirim #{notifications.length - index}</Text>
                </View>
                <TagPill tag={{ id: item.id, label: item.type.toUpperCase(), tone: item.tone }} />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
              <View style={styles.bottomRow}>
                <Text style={styles.actionHint}>Aksiyon önerisi</Text>
                <Pressable style={({ pressed }) => [styles.action, pressed && styles.pressablePressed]} onPress={() => router.push(item.route as never)}>
                  <Text style={styles.actionText}>{item.ctaLabel}</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </AnimatedEntrance>
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  pressablePressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.96,
  },
  heroCard: {
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
    gap: spacing.sm,
  },
  heroEyebrow: {
    color: '#FFB06A',
    fontSize: 13,
    fontWeight: '800',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
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
  heroDescription: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 21,
  },
  emptyWrap: {
    gap: spacing.sm,
  },
  emptyAction: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  emptyActionText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 14,
  },
  list: {
    gap: spacing.md,
  },
  notificationCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: '#E4EAF2',
    padding: spacing.xl,
    gap: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  metaWrap: {
    gap: 2,
  },
  time: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  orderLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: colors.navy,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '900',
  },
  body: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  actionHint: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  action: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  actionText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 14,
  },
});
