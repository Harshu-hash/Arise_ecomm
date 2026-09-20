import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/colors';
import { SPACING, RADIUS } from '../../../constants/spacing';
import {
  StatusBarManager,
  PriceBlock,
  RatingBadge,
  ExpandableCard,
  DeliveryDetailRow,
  SellerInfoRow,
  MiniInfoChip,
  SectionHeaderArrow,
  HorizontalProductRail,
} from '../../../shared/components';

const SIMILAR_PRODUCTS = [
  { id: 'sim1', name: 'HAYATCRAFT HANDMADE Diary', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80', price: 162, mrp: 999, discountPct: 84, rating: 4.2, deliveryDate: '27 Aug' },
  { id: 'sim2', name: 'The journal craft preamn...', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=400&q=80', price: 138, mrp: 599, discountPct: 77, rating: 4.3, deliveryDate: '27 Aug' },
  { id: 'sim3', name: 'LIFE FIT Spiral Notebook', image: 'https://images.unsplash.com/photo-1518893883800-45cd0954574b?auto=format&fit=crop&w=400&q=80', price: 199, mrp: 599, discountPct: 66, rating: 4.4, deliveryDate: '27 Aug' },
];

const ProductDetailScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const product = route?.params?.product || {
    name: 'LIFE FIT radhe radhe Diary Collection Notebook | Free Stickers A5 Diary Unruled 150 Pages (Multicolour)',
    brand: 'LIFE FIT',
    price: 298,
    mrp: 795,
    rating: 5,
    ratingCount: 3,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    seller: 'LifeFit',
    sellerRating: 4.5,
    sellerYears: 3,
    deliveryDate: 'Friday, 28 Aug',
  };

  const [quantity, setQuantity] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBarManager barStyle="dark-content" themeColor={COLORS.surface} />

      <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          <Icon name="share-2" size={18} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageBox}>
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
          ) : null}
          <RatingBadge
            variant="pillLight"
            rating={product.rating}
            count={product.ratingCount}
            style={styles.ratingOverlay}
          />
        </View>
        <View style={styles.galleryProgressTrack}>
          <View style={styles.galleryProgressBar} />
        </View>

        <View style={styles.infoSection}>
          {product.brand ? <Text style={styles.brand}>{product.brand}</Text> : null}
          <Text style={styles.title}>{product.name}</Text>

          <PriceBlock price={product.price} mrp={product.mrp} size="lg" style={{ marginTop: SPACING.m }} />

          {product.mrp && product.mrp > product.price ? (
            <View style={styles.appliedChip}>
              <Icon name="tag" size={12} color={COLORS.ratingGreen} />
              <Text style={styles.appliedChipText}>
                {`₹${product.mrp - product.price} off applied for you`}
              </Text>
            </View>
          ) : null}
        </View>

        <ExpandableCard title="Delivery details" defaultOpen style={styles.sectionCard}>
          <View style={styles.deliveryDetailsBox}>
            <DeliveryDetailRow
              icon="map-pin"
              primaryText="84/2, Dheeraj shah nagar, Ratlam, Ratl..."
              showChevron
            />
            <DeliveryDetailRow
              icon="truck"
              primaryText={`Delivery by ${product.deliveryDate}`}
              secondaryText="Arriving in time for your celebration"
              isLast
            />
            <SellerInfoRow
              sellerName={product.seller || 'Flipkart Seller'}
              rating={product.sellerRating || 4.5}
              yearsWithFlipkart={product.sellerYears || 2}
              onSeeOtherSellers={() => {}}
            />
          </View>
        </ExpandableCard>

        <View style={styles.chipRow}>
          <MiniInfoChip icon="clock" label="Cancellation upto 24hrs" />
          <MiniInfoChip icon="refresh-ccw" label="7 Days Replacement" />
        </View>

        <View style={styles.similarSection}>
          <SectionHeaderArrow title="Similar Products" onPress={() => {}} />
          <HorizontalProductRail
            data={SIMILAR_PRODUCTS}
            showRating
            showDelivery
            onPressItem={(p) => navigation && navigation.push('ProductDetail', { product: p })}
          />
        </View>

        <ExpandableCard title="Product Details" style={styles.sectionCard}>
          <Text style={styles.plainText}>
            {product.description || 'A5 size unruled diary with 150 pages, hardbound multicolour cover and free stickers included.'}
          </Text>
        </ExpandableCard>

        <ExpandableCard title="Ratings and Reviews" defaultOpen style={styles.sectionCard}>
          <View style={styles.reviewHeaderRow}>
            <Text style={styles.reviewScore}>{product.rating || 5}</Text>
            <View style={styles.reviewStarBadge}>
              <Icon name="star" size={13} color={COLORS.white} />
            </View>
            <View style={styles.excellentChip}>
              <Text style={styles.excellentChipText}>Excellent</Text>
            </View>
          </View>
          <View style={styles.reviewSubtextRow}>
            <Text style={styles.reviewSubtext}>{`based on ${product.ratingCount || 3} ratings by`}</Text>
            <Icon name="check-circle" size={11} color={COLORS.ratingGreen} style={{ marginHorizontal: 4 }} />
            <Text style={styles.reviewSubtext}>Verified Buyers</Text>
          </View>
        </ExpandableCard>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation && navigation.navigate('Cart')}
          style={styles.goToCartBtn}>
          <Text style={styles.goToCartText}>Go to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation &&
            navigation.navigate('Checkout', {
              items: [
                {
                  id: product.id || 'buy-now-item',
                  name: product.name,
                  variant: product.variant,
                  qty: Math.max(quantity, 1),
                  price: product.price,
                  mrp: product.mrp,
                  image: product.image,
                },
              ],
            })
          }
          style={styles.buyNowBtn}>
          <Text style={styles.buyNowText}>Buy now</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.l,
    paddingBottom: SPACING.m,
  },
  backBtn: {
    padding: 4,
  },
  shareBtn: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageBox: {
    backgroundColor: COLORS.primaryLight,
    height: 240,
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.m,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.m,
  },
  galleryProgressTrack: {
    height: 3,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.l,
    marginTop: SPACING.s,
    borderRadius: RADIUS.round,
    overflow: 'hidden',
  },
  galleryProgressBar: {
    width: '33%',
    height: '100%',
    backgroundColor: COLORS.textPrimary,
    borderRadius: RADIUS.round,
  },
  ratingOverlay: {
    position: 'absolute',
    left: SPACING.l,
    bottom: SPACING.m,
  },
  infoSection: {
    backgroundColor: COLORS.surface,
    padding: SPACING.l,
    marginTop: SPACING.s,
  },
  brand: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  appliedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.ratingGreenBg,
    paddingHorizontal: SPACING.s,
    paddingVertical: 5,
    borderRadius: RADIUS.s,
    marginTop: SPACING.m,
  },
  appliedChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.ratingGreen,
    marginLeft: 5,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.l,
    marginTop: SPACING.s,
  },
  deliveryDetailsBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.m,
    overflow: 'hidden',
  },
  chipRow: {
    flexDirection: 'row',
    gap: SPACING.s,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    marginTop: SPACING.s,
  },
  similarSection: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.l,
    marginTop: SPACING.s,
  },
  plainText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewScore: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginRight: 4,
  },
  reviewStarBadge: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: COLORS.ratingGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s,
  },
  excellentChip: {
    backgroundColor: COLORS.ratingGreenBg,
    paddingHorizontal: SPACING.s,
    paddingVertical: 3,
    borderRadius: RADIUS.xs,
  },
  excellentChipText: {
    color: COLORS.ratingGreen,
    fontSize: 12,
    fontWeight: '700',
  },
  reviewSubtextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: SPACING.s,
  },
  reviewSubtext: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.m,
    flexDirection: 'row',
    gap: SPACING.m,
  },
  goToCartBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.s,
    paddingVertical: SPACING.m,
    alignItems: 'center',
  },
  goToCartText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  buyNowBtn: {
    flex: 1,
    backgroundColor: COLORS.ctaGold,
    borderRadius: RADIUS.s,
    paddingVertical: SPACING.m,
    alignItems: 'center',
  },
  buyNowText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default ProductDetailScreen;
