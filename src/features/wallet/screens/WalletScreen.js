import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/colors';
import { StatusBarManager } from '../../../shared/components';
import WalletHeroCard from '../components/WalletHeroCard';
import WalletQuickActions from '../components/WalletQuickActions';
import WalletRewardsSection from '../components/WalletRewardsSection';
import WalletTransactionList from '../components/WalletTransactionList';
import { HERO_GRADIENT, QUICK_ACTIONS, REWARD_CARDS, TRANSACTIONS } from '../data/walletData';

const WALLET_BALANCE = 391;
const WALLET_COINS = 0;

const WalletScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (navigation && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation && navigation.navigate('MainTabs', { screen: 'Home' });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBarManager barStyle="light-content" themeColor={HERO_GRADIENT[0]} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <WalletHeroCard
          topInset={Math.max(insets.top, 12)}
          balance={WALLET_BALANCE}
          coins={WALLET_COINS}
          onBack={handleBack}
        />

        <WalletQuickActions actions={QUICK_ACTIONS} />

        <WalletRewardsSection title="Rewards for you" cards={REWARD_CARDS} />

        <WalletTransactionList transactions={TRANSACTIONS} />
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
});

export default WalletScreen;
