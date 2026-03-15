import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { StateCard } from '@/components/common/StateCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useNotificationsList } from '@/hooks/useNotifications';

export default function NotificationsScreen() {
  const { data: notifications = [], isLoading, isError } = useNotificationsList();

  return (
    <AppScreen>
      <AppHeader title="Bildirimler" subtitle="Fırsat, takip ve işlem güncellemeleri burada listelenir." showBackButton={false} />

      {isLoading ? <StateCard title="Yükleniyor" description="Bildirimlerin hazırlanıyor..." /> : null}
      {isError ? <StateCard title="Bildirimler alınamadı" description="Şu an bildirimler yüklenemedi." tone="danger" /> : null}
      {!isLoading && !isError && notifications.length === 0 ? (
        <View style={styles.emptyWrap}>
          <StateCard title="Bildirimin yok" description="Yeni fırsat veya takip güncellemesi olduğunda burada göreceksin." tone="warning" />
          <Pressable style={styles.emptyAction} onPress={() => router.push('/(tabs)/for-you')}>
            <Text style={styles.emptyActionText}>Senin İçin'e Git</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.list}>
        {notifications.map((item, index) => (
          <SurfaceCard key={item.id}>
            <View style={styles.topRow}>
              <Text style={styles.time}>{item.timeLabel}</Text>
              <TagPill tag={{ id: item.id, label: item.type.toUpperCase(), tone: item.tone }} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <View style={styles.bottomRow}>
              <Text style={styles.orderLabel}>Bildirim #{notifications.length - index}</Text>
              <Pressable style={styles.action} onPress={() => router.push(item.route as never)}>
                <Text style={styles.actionText}>{item.ctaLabel}</Text>
              </Pressable>
            </View>
          </SurfaceCard>
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  time: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: colors.navy,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '900',
    marginBottom: 6,
  },
  body: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  orderLabel: {
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
