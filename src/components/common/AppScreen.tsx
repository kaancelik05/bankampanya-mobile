import { SafeAreaView } from 'react-native-safe-area-context';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '@/theme/colors';
import { screen } from '@/theme/layout';
import { spacing } from '@/theme/spacing';

type AppScreenProps = {
  children: ReactNode;
  scroll?: boolean;
};

export function AppScreen({ children, scroll = true }: AppScreenProps) {
  const content = <View style={styles.content}>{children}</View>;

  return (
    <SafeAreaView style={styles.safeArea}>
      {scroll ? <ScrollView contentContainerStyle={styles.scroll}>{content}</ScrollView> : content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
  },
  content: {
    width: '100%',
    maxWidth: screen.maxWidth,
    alignSelf: 'center',
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing['3xl'],
    gap: spacing.lg,
  },
});
