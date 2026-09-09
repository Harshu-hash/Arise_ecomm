import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/colors';
import { SPACING, RADIUS } from '../../../constants/spacing';
import { StatusBarManager, TopBrandTabs, GradientBackground } from '../../../shared/components';
import { BRAND_TABS } from '../../home/data/homeData';
import OfferThemeSection from '../components/OfferThemeSection';

const RAKHI_ESSENTIALS = [
  { id: 're1', image: 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?auto=format&fit=crop&w=300&q=80', bannerText: 'From ₹89', label: 'Designer rakhis' },
  { id: 're2', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=300&q=80', bannerText: 'Min. 50% Off', label: 'Toys & more' },
  { id: 're3', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80', bannerText: 'Just ₹235', label: 'Mug' },
];

const RAKHI_GIFTING = [
  { id: 'rg1', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=300&q=80', bannerText: 'Min. 30% Off', label: 'Lipstick' },
  { id: 'rg2', image: 'https://images.unsplash.com/photo-1584813470613-5a1c1cad3d69?auto=format&fit=crop&w=300&q=80', bannerText: 'Min. 40% Off', label: 'Iron' },
  { id: 'rg3', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=300&q=80', bannerText: 'Starting ₹399', label: 'Bedsheets' },
];

const FLASH_HOUR_DEALS = [
  { id: 'fh1', image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=300&q=80', bannerText: 'Min. 50% Off', label: 'Kapiva' },
  { id: 'fh2', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=300&q=80', bannerText: 'Min. 60% Off', label: 'PUMA, Reebok...' },
  { id: 'fh3', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80', bannerText: 'Under ₹80', label: 'Sip & chill' },
];

const GROCERY_DEALS = [
  { id: 'gd1', image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=300&q=80', bannerText: 'Upto 50% Off', label: 'Lizol & more' },
  { id: 'gd2', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80', bannerText: 'Starting at ₹49', label: 'Dals & spices' },
  { id: 'gd3', image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=300&q=80', bannerText: 'Under ₹299', label: 'Breakfast needs' },
];

const OffersScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBarManager barStyle="light-content" themeColor={COLORS.offerRed} />

      <View style={styles.headerZone}>
        <GradientBackground colors={[COLORS.offerRed, COLORS.campaignGradientStart]} />
        <View style={{ paddingTop: Math.max(insets.top, 12) }}>
          <TopBrandTabs tabs={BRAND_TABS} activeId="value365" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <Text style={styles.heroWordmark}>VALUE 365</Text>
          <Text style={styles.heroSubtitle}>LOWEST PRICES EVERY DAY.</Text>
        </View>

        <OfferThemeSection title="Rakhi Essentials" items={RAKHI_ESSENTIALS} variant="gradient" />
        <OfferThemeSection title="Rakhi Gifting" items={RAKHI_GIFTING} variant="gradient" />
        <OfferThemeSection
          title="Flash Hour Deals"
          items={FLASH_HOUR_DEALS}
          variant="gradient"
          countdownText="00d : 01h : 34m : 59s"
        />
        <OfferThemeSection title="Deals on Grocery" items={GROCERY_DEALS} variant="solid" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerZone: {
    position: 'relative',
    paddingBottom: SPACING.m,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: '#7A0C1E',
    marginHorizontal: SPACING.l,
    marginTop: SPACING.l,
    borderRadius: RADIUS.l,
    paddingVertical: SPACING.xxl,
    alignItems: 'center',
  },
  heroWordmark: {
    color: COLORS.ctaYellow,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroSubtitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    marginTop: SPACING.s,
    letterSpacing: 0.5,
  },
});

export default OffersScreen;
