import { Animated } from 'react-native';
import { ReactNode } from 'react';
import { useFadeSlideIn } from '@/hooks/useFadeSlideIn';

type AnimatedEntranceProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  translateY?: number;
};

export function AnimatedEntrance({ children, delay, duration, translateY }: AnimatedEntranceProps) {
  const animatedStyle = useFadeSlideIn({ delay, duration, translateY });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
