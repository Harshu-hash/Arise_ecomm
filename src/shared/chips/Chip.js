import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@theme';
import AppText from '@shared/ui/AppText';
import PressableScale from '@shared/ui/PressableScale';

const CHIP_HEIGHT = 34;

/**
 * Selectable chip for filters, sizes, variants and quick categories.
 * Selected state uses the subtle brand tint — never a loud fill.
 */
function Chip({ label, selected = false, onPress, icon, style }) {
  const { colors, radius, spacing } = useTheme();

  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[
        styles.base,
        {
          height: CHIP_HEIGHT,
          borderRadius: radius.pill,
          paddingHorizontal: spacing.sm,
          backgroundColor: selected ? colors.primarySubtle : colors.surface,
          borderColor: selected ? colors.primary : colors.border,
        },
        style,
      ]}>
      {icon ? (
        <Icon
          name={icon}
          size={14}
          color={selected ? colors.primary : colors.textSecondary}
          style={{ marginRight: spacing.xxs }}
        />
      ) : null}
      <AppText variant="label" color={selected ? 'primary' : 'textSecondary'}>
        {label}
      </AppText>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', borderWidth: 1 },
});

export default React.memo(Chip);
