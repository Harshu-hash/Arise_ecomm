import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme';
import AppText from '@shared/ui/AppText';

/**
 * Badge variants map to semantic intents:
 * 'discount' (green), 'warning', 'error', 'info', 'accent' (offers), 'neutral'.
 * Used for discount %, stock status, order status, "Sponsored" labels.
 */
function Badge({ label, variant = 'neutral', style }) {
  const { colors, radius, spacing } = useTheme();

  const variants = {
    discount: { bg: colors.successSubtle, text: 'success' },
    warning: { bg: colors.warningSubtle, text: 'warning' },
    error: { bg: colors.errorSubtle, text: 'error' },
    info: { bg: colors.infoSubtle, text: 'info' },
    accent: { bg: colors.accentSubtle, text: 'textPrimary' },
    neutral: { bg: colors.surfaceVariant, text: 'textSecondary' },
  };
  const { bg, text } = variants[variant] || variants.neutral;

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: bg,
          borderRadius: radius.xs,
          paddingHorizontal: spacing.xxs + 2,
          paddingVertical: 2,
        },
        style,
      ]}>
      <AppText variant="offer" color={text} numberOfLines={1}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start' },
});

export default React.memo(Badge);
