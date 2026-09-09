import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/colors';
import { SPACING, RADIUS } from '../../../constants/spacing';
import {
  StatusBarManager,
  SegmentedPillTabs,
  PriceBlock,
  RatingBadge,
  EmptyCartIllustration,
  HorizontalProductRail,
} from '../../../shared/components';

const CART_TABS = [
  { id: 'flipkart', label: 'Flipkart' },
  { id: 'minutes', label: 'Minutes' },
];

const INITIAL_CART_ITEMS = [
  {
    id: 'c1',
    name: 'LIFE FIT radhe radhe Diary Collection Notebook | Free Stickers A5 Diary Unruled 150 Pages',
    variant: 'Multicolour',
    rating: 5.0,
    ratingCount: 3,
    assured: true,
    qty: 1,
    price: 298,
    mrp: 795,
    deliveryDate: 'Aug 28, Fri',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
  },
];

const SUGGESTED_PRODUCTS = [
  { id: 'sg1', name: 'Noise ColorFit Smartwatch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', price: 1299, mrp: 4999 },
  { id: 'sg2', name: 'Floral Print Shorts', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=400&q=80', price: 349, mrp: 899 },
  { id: 'sg3', name: 'Wireless Earbuds', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80', price: 799, mrp: 1999 },
];

const CartScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('flipkart');
  const [items, setItems] = useState(INITIAL_CART_ITEMS);

  const handleRemove = (id) => setItems((prev) => prev.filter((item) => item.id !== id));

  const mrpTotal = items.reduce((sum, item) => sum + item.mrp * item.qty, 0);
  const fees = items.length ? 9 : 0;
  const discounts = mrpTotal - items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const finalTotal = mrpTotal + fees - discounts;

  const tabs = CART_TABS.map((tab) => ({ ...tab, count: tab.id === 'flipkart' ? items.length : undefined }));

  return (
    <View style={styles.container}>
      <StatusBarManager barStyle="dark-content" themeColor={COLORS.surface} />

      <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <SegmentedPillTabs tabs={tabs} activeId={activeTab} onSelect={(tab) => setActiveTab(tab.id)} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {items.length === 0 ? (
          <>
            <View style={styles.emptyPanel}>
              <EmptyCartIllustration />
              <Text style={styles.emptyTitle}>Your cart is empty!</Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation && navigation.navigate('Home')}
                style={styles.shopNowBtn}>
                <Text style={styles.shopNowText}>Shop now</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.suggestedWrapper}>
              <Text style={styles.suggestedTitle}>Suggested for You</Text>
              <Text style={styles.suggestedSubtitle}>Based on Your Activity</Text>
              <HorizontalProductRail
                data={SUGGESTED_PRODUCTS}
                style={{ marginTop: SPACING.m }}
                onPressItem={(product) => navigation && navigation.navigate('ProductDetail', { product })}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.deliverRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.deliverText}>
                  Deliver to: <Text style={styles.deliverBold}>Harshvardhan P...</Text>, 457001
                </Text>
                <Text style={styles.deliverAddress}>84/2, Dheeraj shah nagar, Ratlam, Ratlam</Text>
              </View>
              <TouchableOpacity style={styles.changeBtn}>
                <Text style={styles.changeBtnText}>Change</Text>
              </TouchableOpacity>
            </View>

            {items.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemTopRow}>
                  <View style={styles.itemImageCol}>
                    <View style={styles.itemImageBox}>
                      <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
                      <View style={styles.zoomTag}>
                        <Icon name="search" size={10} color={COLORS.white} />
                        <Text style={styles.zoomTagText}>Zoom</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.qtyBtn}>
                      <Text style={styles.qtyText}>{`Qty: ${item.qty}`}</Text>
                      <Icon name="chevron-down" size={14} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.itemVariant}>{item.variant}</Text>
                    <View style={styles.ratingRow}>
                      <RatingBadge variant="stars" rating={item.rating} count={item.ratingCount} />
                      {item.assured ? (
                        <View style={styles.assuredRow}>
                          <Icon name="shield" size={13} color={COLORS.primary} />
                          <Text style={styles.assuredText}>Assured</Text>
                        </View>
                      ) : null}
                    </View>
                    <PriceBlock price={item.price} mrp={item.mrp} style={{ marginTop: SPACING.s }} />
                  </View>
                </View>

                <Text style={styles.deliveryText}>{`Delivery by ${item.deliveryDate}`}</Text>

                <View style={styles.actionsRow}>
                  <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.actionBtn}>
                    <Icon name="trash-2" size={15} color={COLORS.textSecondary} />
                    <Text style={styles.actionText}>Remove</Text>
                  </TouchableOpacity>
                  <View style={styles.actionDivider} />
                  <TouchableOpacity style={styles.actionBtn}>
                    <Icon name="bookmark" size={15} color={COLORS.textSecondary} />
                    <Text style={styles.actionText}>Save for later</Text>
                  </TouchableOpacity>
                  <View style={styles.actionDivider} />
                  <TouchableOpacity
                    onPress={() => navigation && navigation.navigate('Tracking')}
                    style={styles.actionBtn}>
                    <Icon name="zap" size={15} color={COLORS.textSecondary} />
                    <Text style={styles.actionText}>Buy this now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={styles.priceDetailsCard}>
              <Text style={styles.priceDetailsTitle}>Price Details</Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>MRP (incl. of all taxes)</Text>
                <Text style={styles.priceValue}>{`₹${mrpTotal}`}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Fees</Text>
                <Text style={styles.priceValue}>{`₹${fees}`}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Discounts</Text>
                <Text style={[styles.priceValue, { color: COLORS.ratingGreen }]}>{`₹${discounts}`}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {items.length > 0 ? (
        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View>
            <Text style={styles.bottomMrp}>{mrpTotal}</Text>
            <View style={styles.bottomTotalRow}>
              <Text style={styles.bottomTotal}>{finalTotal}</Text>
              <Icon name="info" size={13} color={COLORS.textTertiary} style={{ marginLeft: 5 }} />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation && navigation.navigate('Tracking')}
            style={styles.placeOrderBtn}>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.l,
    paddingBottom: SPACING.m,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingTop: SPACING.m,
    paddingBottom: 140,
  },
  emptyPanel: {
    backgroundColor: COLORS.mutedBg,
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
    marginHorizontal: SPACING.l,
    borderRadius: RADIUS.m,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.l,
    marginBottom: SPACING.l,
  },
  shopNowBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.s + 2,
    borderRadius: RADIUS.s,
  },
  shopNowText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  suggestedWrapper: {
    marginTop: SPACING.xl,
  },
  suggestedTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.l,
  },
  suggestedSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    paddingHorizontal: SPACING.l,
    marginTop: 2,
  },
  deliverRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    marginBottom: SPACING.s,
  },
  deliverText: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  deliverBold: {
    fontWeight: '700',
  },
  deliverAddress: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  changeBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.s,
    paddingHorizontal: SPACING.m,
    paddingVertical: 6,
  },
  changeBtnText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 12,
  },
  itemCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.l,
    marginBottom: SPACING.s,
  },
  itemTopRow: {
    flexDirection: 'row',
    marginBottom: SPACING.s,
  },
  itemImageCol: {
    marginRight: SPACING.m,
  },
  itemImageBox: {
    width: 84,
    height: 84,
    borderRadius: RADIUS.xs,
    overflow: 'hidden',
    backgroundColor: COLORS.mutedBg,
    marginBottom: SPACING.s,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  zoomTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  zoomTagText: {
    color: COLORS.white,
    fontSize: 9,
    marginLeft: 3,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  itemVariant: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
    gap: SPACING.s,
    flexWrap: 'wrap',
  },
  assuredRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assuredText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 3,
  },
  qtyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 5,
  },
  qtyText: {
    fontSize: 11.5,
    color: COLORS.textPrimary,
    marginRight: 4,
  },
  deliveryText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.s,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.m,
    paddingTop: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 11.5,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  actionDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border,
  },
  priceDetailsCard: {
    backgroundColor: COLORS.mutedBg,
    borderRadius: RADIUS.m,
    marginHorizontal: SPACING.l,
    padding: SPACING.l,
    marginTop: SPACING.s,
  },
  priceDetailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.m,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s,
  },
  priceLabel: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  priceValue: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomMrp: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  bottomTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  placeOrderBtn: {
    backgroundColor: COLORS.ctaYellow,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.m,
    borderRadius: RADIUS.s,
  },
  placeOrderText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default CartScreen;
