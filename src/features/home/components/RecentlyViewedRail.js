import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { SPACING, RADIUS } from '../../../constants/spacing';

/** "Still looking for these?" recently-viewed rail — square image + 2-line label. */
const RecentlyViewedRail = ({ items, onPressItem }) => (
  <View style={styles.wrapper}>
    <Text style={styles.title}>Still looking for these?</Text>
    <FlatList
      horizontal
      data={items}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: SPACING.l }}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={0.85} onPress={() => onPressItem && onPressItem(item)} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.itemSubtitle} numberOfLines={1}>{item.subtitle}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    paddingTop: SPACING.l,
    paddingBottom: SPACING.m,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.m,
  },
  card: {
    width: 100,
    marginRight: SPACING.m,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.s,
    backgroundColor: COLORS.mutedBg,
    marginBottom: SPACING.xs,
  },
  itemTitle: {
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  itemSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});

export default RecentlyViewedRail;
