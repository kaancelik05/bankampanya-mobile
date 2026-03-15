import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export function BrandMark() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="wallet-outline" size={16} color={colors.navy} />
      </View>
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
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: '#FFD6B0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
    textTransform: 'lowercase',
  },
});
