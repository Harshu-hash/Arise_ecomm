import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/colors';
import { SPACING, RADIUS } from '../../../constants/spacing';
import { StatusBarManager, AccountListRow } from '../../../shared/components';

const QUICK_ACTIONS = [
  { id: 'orders', label: 'Orders', icon: 'package' },
  { id: 'wishlist', label: 'Wishlist', icon: 'heart' },
  { id: 'coupons', label: 'Coupons', icon: 'gift' },
  { id: 'help', label: 'Help Center', icon: 'headphones' },
];

const FINANCE_OPTIONS = [
  { id: 'f1', icon: 'smartphone', title: 'Pre-Approved Supermoney Credit Card', subtitle: '1% cashback on UPI & Non-UPI | 100% Approval | Lifetime Free' },
  { id: 'f2', icon: 'credit-card', title: 'Flipkart EMI - Only for you!', subtitle: 'Upto ₹750 off | No Cost EMI*' },
  { id: 'f3', icon: 'credit-card', title: 'Apply Now for Flipkart Axis Bank Credit Card', subtitle: '5% Cashback | ₹1,500 Gift Vouchers' },
];

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const email = 'harshvardhanpanc145@gmail...';

  return (
    <View style={styles.container}>
      <StatusBarManager barStyle="dark-content" themeColor={COLORS.surface} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top, 12) }]}>
        <View style={styles.userCard}>
          <View style={styles.userCardTopRow}>
            <Text style={styles.userEmail} numberOfLines={1}>{email}</Text>
            <View style={styles.coinPill}>
              <Icon name="zap" size={12} color={COLORS.ctaYellow} />
              <Text style={styles.coinText}>0</Text>
            </View>
          </View>
          <Text style={styles.userCardCopy}>
            Enjoy FREE YouTube Premium, Early Access to sale and more with Black.
          </Text>
          <TouchableOpacity activeOpacity={0.85} style={styles.exploreBlackBtn}>
            <Text style={styles.exploreBlackText}>
              Explore <Text style={{ fontWeight: '900' }}>BLACK</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              activeOpacity={0.8}
              onPress={() => action.id === 'orders' && navigation && navigation.navigate('Tracking')}
              style={styles.quickCard}>
              <Icon name={action.icon} size={18} color={COLORS.primary} />
              <Text style={styles.quickLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation && navigation.navigate('AccountSettings')}
          style={styles.settingsEntryRow}>
          <Icon name="settings" size={18} color={COLORS.primary} />
          <Text style={styles.settingsEntryText}>Account Settings</Text>
          <Icon name="chevron-right" size={18} color={COLORS.textTertiary} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Finance Options</Text>
        <View style={styles.listGroup}>
          {FINANCE_OPTIONS.map((item) => (
            <AccountListRow key={item.id} icon={item.icon} label={item.title} subtitle={item.subtitle} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Finance On UPI</Text>
        <View style={styles.listGroup}>
          <AccountListRow
            icon="file-text"
            label="superCard | Buy Now Pay later in 3"
            subtitle="Enjoy 3% cashback | Activate Fk UPI and pay in 3 months"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  userCard: {
    backgroundColor: COLORS.primaryLight,
    marginHorizontal: SPACING.l,
    borderRadius: RADIUS.m,
    padding: SPACING.l,
  },
  userCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userEmail: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginRight: SPACING.s,
  },
  coinPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.ctaYellow,
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.s,
    paddingVertical: 3,
  },
  coinText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginLeft: 3,
  },
  userCardCopy: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: SPACING.m,
    lineHeight: 18,
  },
  exploreBlackBtn: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.black,
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.s,
    marginTop: SPACING.m,
  },
  exploreBlackText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.l,
    marginTop: SPACING.l,
    gap: SPACING.s,
  },
  quickCard: {
    width: '47.5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.s,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.m,
  },
  quickLabel: {
    fontSize: 13.5,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SPACING.s,
  },
  settingsEntryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.l,
    marginTop: SPACING.l,
    paddingVertical: SPACING.m,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  settingsEntryText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SPACING.s,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.l,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xs,
  },
  listGroup: {
    marginTop: SPACING.xs,
  },
});

export default ProfileScreen;
