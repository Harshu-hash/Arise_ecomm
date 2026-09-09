import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/colors';
import { SPACING } from '../../../constants/spacing';
import { StatusBarManager, AccountListRow } from '../../../shared/components';

const SECTIONS = [
  {
    title: 'Account Settings',
    rows: [
      { id: 'plus', icon: 'award', label: 'Flipkart Plus' },
      { id: 'devices', icon: 'smartphone', label: 'Manage Devices' },
      { id: 'edit', icon: 'user', label: 'Edit Profile' },
      { id: 'cards', icon: 'credit-card', label: 'Saved Credit / Debit & Gift Cards' },
      { id: 'addresses', icon: 'map-pin', label: 'Saved Addresses' },
      { id: 'language', icon: 'globe', label: 'Select Language' },
      { id: 'notifications', icon: 'bell', label: 'Notification Settings' },
      { id: 'privacy', icon: 'shield', label: 'Privacy Center' },
    ],
  },
  {
    title: 'My Activity',
    rows: [
      { id: 'reviews', icon: 'edit-2', label: 'Reviews' },
      { id: 'qa', icon: 'message-square', label: 'Questions & Answers' },
    ],
  },
  {
    title: 'Earn with Flipkart',
    rows: [{ id: 'sell', icon: 'shopping-bag', label: 'Sell on Flipkart' }],
  },
  {
    title: 'Feedback & Information',
    rows: [
      { id: 'rate', icon: 'star', label: 'Rate Us' },
      { id: 'about', icon: 'info', label: 'About Flipkart' },
      { id: 'terms', icon: 'file-text', label: 'Terms & Conditions' },
    ],
  },
];

const AccountSettingsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBarManager barStyle="dark-content" themeColor={COLORS.surface} />

      <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {SECTIONS.map((section, index) => (
          <View key={section.title} style={[styles.section, index > 0 && styles.sectionDivider]}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.rows.map((row) => (
              <AccountListRow key={row.id} icon={row.icon} label={row.label} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.l,
    paddingBottom: SPACING.m,
  },
  backBtn: {
    marginRight: SPACING.m,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  section: {
    backgroundColor: COLORS.surface,
    paddingTop: SPACING.s,
  },
  sectionDivider: {
    marginTop: SPACING.s,
    borderTopWidth: 6,
    borderTopColor: COLORS.background,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.m,
    paddingBottom: SPACING.s,
  },
});

export default AccountSettingsScreen;
