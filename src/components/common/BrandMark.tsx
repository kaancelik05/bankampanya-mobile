import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export function BrandMark() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.primary, '#FF9A42']} style={styles.iconWrap}>
        <View style={styles.iconInner}>
          <Ionicons name="wallet-outline" size={14} color="#FFFFFF" />
        </View>
      </LinearGradient>
      <Text style={styles.text}>bankampanya</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  iconInner: {
    width: 24,
    height: 24,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  text: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.2,
    textTransform: 'lowercase',
  },
});
