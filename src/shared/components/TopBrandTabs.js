import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { SPACING, RADIUS } from '../../constants/spacing';

/**
 * "Flipkart / Value 365" row used on Home & Offers headers.
 * tabs: [{ id, label, icon, tintBg }]
 */
const TopBrandTabs = ({ tabs, activeId, onSelect }) => (
  <View style={styles.row}>
    {tabs.map((tab) => {
      const isActive = tab.id === activeId;
      return (
        <TouchableOpacity
          key={tab.id}
          activeOpacity={0.85}
          onPress={() => onSelect && onSelect(tab)}
          style={[
            styles.card,
            { backgroundColor: isActive ? tab.tintBg || COLORS.ctaGold : COLORS.white },
          ]}>
          <Icon name={tab.icon} size={18} color={isActive ? COLORS.textPrimary : COLORS.primary} />
          <Text style={styles.label} numberOfLines={1}>{tab.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.l,
    gap: SPACING.s,
  },
  card: {
    flex: 1,
    borderRadius: RADIUS.s,
    paddingVertical: SPACING.s,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
});

export default TopBrandTabs;
