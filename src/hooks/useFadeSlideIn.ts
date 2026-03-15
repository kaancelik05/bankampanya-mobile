import { Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

type FadeSlideInOptions = {
  duration?: number;
  delay?: number;
  translateY?: number;
};

export function useFadeSlideIn(options: FadeSlideInOptions = {}) {
  const { duration = 420, delay = 0, translateY = 10 } = options;
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(translateY)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, duration, opacity, translate]);

  return {
    opacity,
    transform: [{ translateY: translate }],
  };
}
