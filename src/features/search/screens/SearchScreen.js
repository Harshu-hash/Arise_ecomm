import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/colors';
import { SPACING, RADIUS } from '../../../constants/spacing';
import { ProductCard, StatusBarManager } from '../../../shared/components';

const TRENDING_SEARCHES = [
  'Amul Taaza Milk',
  'Farm Fresh Eggs',
  'Maggi Noodles',
  'Lay\'s Chips',
  'Aashirvaad Atta',
  'Coca-Cola',
  'Fresh Tomatoes',
  'Fortune Oil',
];

const SEARCH_RESULTS = [
  {
    id: 's1',
    name: 'Amul Taaza Toned Fresh Milk',
    unit: '500 ml',
    price: 28,
    mrp: 30,
    discount: '6% OFF',
    eta: '8 MINS',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 's2',
    name: 'Amul Gold Full Cream Milk',
    unit: '500 ml',
    price: 33,
    mrp: 34,
    discount: '3% OFF',
    eta: '8 MINS',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 's3',
    name: 'Amul Masti Spiced Dahi',
    unit: '200 g',
    price: 20,
    mrp: 22,
    discount: '9% OFF',
    eta: '10 MINS',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
  },
];

const SearchScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [cartItems, setCartItems] = useState({});

  const handleIncrement = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrement = (id) => {
    setCartItems((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  return (
    <View style={styles.container}>
      <StatusBarManager barStyle="dark-content" themeColor={COLORS.surface} />

      {/* Search Header Bar */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity
          onPress={() => navigation && navigation.goBack()}
          style={styles.backBtn}>
          <Icon name="arrow-left" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.searchInputBox}>
          <Icon name="search" size={18} color={COLORS.primary} style={{ marginRight: SPACING.s }} />
          <TextInput
            autoFocus
            value={query}
            onChangeText={setQuery}
            placeholder="Search for items..."
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
          />
          {query.length > 0 ? (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Icon name="x-circle" size={16} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ) : (
            <Icon name="mic" size={16} color={COLORS.primary} />
          )}
        </View>
      </View>

      {query.trim().length === 0 ? (
        /* Default Search State: Trending Searches */
        <View style={styles.trendingContainer}>
          <View style={styles.trendingHeader}>
            <Icon name="trending-up" size={18} color={COLORS.primary} style={{ marginRight: SPACING.s }} />
            <Text style={styles.trendingTitle}>Trending Searches</Text>
          </View>

          <View style={styles.chipsContainer}>
            {TRENDING_SEARCHES.map((item) => (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() => setQuery(item)}
                style={styles.trendingChip}>
                <Icon name="search" size={12} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
                <Text style={styles.chipText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        /* Results Grid */
        <FlatList
          data={SEARCH_RESULTS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.gridRow}
          ListHeaderComponent={
            <Text style={styles.resultsLabel}>
              Showing results for "{query}"
            </Text>
          }
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              quantity={cartItems[item.id] || 0}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
              onPress={() =>
                navigation && navigation.navigate('ProductDetail', { product: item })
              }
              style={styles.cardOverride}
            />
          )}
        />
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.mutedBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  searchInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.mutedBg,
    borderRadius: RADIUS.l,
    paddingHorizontal: SPACING.m,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  trendingContainer: {
    padding: SPACING.l,
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  trendingTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.s,
  },
  trendingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.m,
    paddingVertical: 8,
    borderRadius: RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  resultsLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.m,
  },
  gridContent: {
    padding: SPACING.l,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: SPACING.m,
  },
  cardOverride: {
    width: '48%',
    marginRight: 0,
  },
});

export default SearchScreen;
