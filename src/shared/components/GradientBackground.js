import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

/**
 * Absolute-fill diagonal gradient backdrop (no native linear-gradient dependency needed —
 * react-native-svg is already installed/linked). Wrap content as a sibling, not a child.
 */
const GradientBackground = ({ colors, id = 'grad' }) => (
  <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
    <Defs>
      <LinearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
        {colors.map((c, i) => (
          <Stop key={c} offset={`${(i / (colors.length - 1)) * 100}%`} stopColor={c} />
        ))}
      </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
  </Svg>
);

export default GradientBackground;
