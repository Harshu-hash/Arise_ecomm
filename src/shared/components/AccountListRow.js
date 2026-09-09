import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

/** Flat "icon + label (+subtitle) + chevron" row used on Account / Account Settings. */
const AccountListRow = ({ icon, label, subtitle, onPress, showChevron = true, style }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={[styles.row, subtitle && styles.rowWithSubtitle, style]}>
    <Icon name={icon} size={19} color={COLORS.primary} style={styles.icon} />
    <View style={styles.textBox}>
      <Text style={styles.label}>{label}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
    {showChevron ? (
      <Icon name="chevron-right" size={18} color={COLORS.textTertiary} style={styles.chevron} />
    ) : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
  },
  rowWithSubtitle: {
    alignItems: 'flex-start',
    paddingVertical: SPACING.m + 2,
  },
  icon: {
    width: 28,
    marginTop: 1,
  },
  chevron: {
    alignSelf: 'center',
  },
  textBox: {
    flex: 1,
  },
  label: {
    fontSize: 14.5,
    fontWeight: '400',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginTop: 2,
  },
});

export default AccountListRow;
