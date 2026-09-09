import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { SPACING, RADIUS } from '../../../constants/spacing';

const BrandsSpotlightSection = ({ brands, onPressBrand }) => (
  <View style={styles.wrapper}>
    <Text style={styles.title}>Brands in Spotlight</Text>
    <FlatList
      horizontal
      data={brands}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: SPACING.l }}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={0.85} onPress={() => onPressBrand && onPressBrand(item)} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          <View style={styles.adTag}>
            <Text style={styles.adTagText}>AD</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.l,
    marginTop: SPACING.s,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.m,
  },
  card: {
    width: 150,
    height: 90,
    borderRadius: RADIUS.s,
    overflow: 'hidden',
    marginRight: SPACING.m,
    backgroundColor: COLORS.mutedBg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  adTag: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  adTagText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '700',
  },
});

export default BrandsSpotlightSection;
