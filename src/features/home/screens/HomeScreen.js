import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { StatusBarManager } from '../../../shared/components';
import LocationSearchHeader from '../components/LocationSearchHeader';
import HeroBannerCarousel from '../components/HeroBannerCarousel';
import AdSheetCard from '../components/AdSheetCard';
import RecentlyViewedRail from '../components/RecentlyViewedRail';
import AdTileRow from '../components/AdTileRow';
import SuggestedForYouSection from '../components/SuggestedForYouSection';
import BrandsSpotlightSection from '../components/BrandsSpotlightSection';
import {
  HERO_BANNERS,
  AD_BANNER,
  RECENTLY_VIEWED,
  AD_TILES,
  SUGGESTED_PRODUCTS,
  BRANDS_SPOTLIGHT,
  CATEGORY_TABS,
} from '../data/homeData';

const DEFAULT_HEADER_HEIGHT = 272;

const HomeScreen = ({ navigation }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORY_TABS[0].id);
  const [address] = useState('84/2, Dheeraj Shah Nagar, Ratlam, Ratlam, ...');
  const [headerHeight, setHeaderHeight] = useState(DEFAULT_HEADER_HEIGHT);

  // Shared with LocationSearchHeader (a position:absolute overlay) so it can translate
  // itself up as the page scrolls — purely transform/opacity, native-driver, no jank.
  const scrollY = useRef(new Animated.Value(0)).current;
  // Second, JS-driven value used ONLY to shrink CategoryTabStrip's own (small, isolated)
  // row height once collapsed — a real layout animation, so it can't run on the native
  // driver, but scoping it to just that row (instead of the whole header) keeps it cheap.
  const categoryRowScrollY = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (e) => categoryRowScrollY.setValue(e.nativeEvent.contentOffset.y),
    }
  );

  const handleSearchPress = () => navigation && navigation.navigate('Search');
  const handleSelectCategory = (tab) => setActiveCategoryId(tab.id);

  return (
    <View style={styles.container}>
      <StatusBarManager barStyle="light-content" themeColor={COLORS.campaignGradientStart} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: headerHeight }]}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <HeroBannerCarousel banners={HERO_BANNERS} />

        <AdSheetCard banner={AD_BANNER} />

        <RecentlyViewedRail
          items={RECENTLY_VIEWED}
          onPressItem={(item) => navigation && navigation.navigate('Category', { category: { name: item.title } })}
        />

        <AdTileRow tiles={AD_TILES} onPressTile={() => navigation && navigation.navigate('Offers')} />

        <SuggestedForYouSection
          products={SUGGESTED_PRODUCTS}
          onPressProduct={(product) => navigation && navigation.navigate('ProductDetail', { product })}
          onSeeAll={() => navigation && navigation.navigate('Search')}
        />

        <BrandsSpotlightSection brands={BRANDS_SPOTLIGHT} onPressBrand={() => {}} />
      </Animated.ScrollView>

      <LocationSearchHeader
        address={address}
        onAddressPress={() => {}}
        onSearchPress={handleSearchPress}
        onScanPress={() => {}}
        activeCategoryId={activeCategoryId}
        onSelectCategory={handleSelectCategory}
        scrollY={scrollY}
        categoryRowScrollY={categoryRowScrollY}
        onHeaderHeight={setHeaderHeight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});

export default HomeScreen;
