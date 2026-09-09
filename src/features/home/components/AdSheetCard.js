import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { SPACING, RADIUS } from '../../../constants/spacing';

/** White rounded sheet overlapping the hero carousel — drag handle + one ad banner card. */
const AdSheetCard = ({ banner }) => (
  <View style={styles.sheet}>
    <View style={styles.handle} />
    <View style={styles.card}>
      <Image source={{ uri: banner.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.adTag}>
        <Text style={styles.adTagText}>AD</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    marginTop: -20,
    paddingTop: SPACING.s,
    paddingBottom: SPACING.l,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.m,
  },
  card: {
    width: '100%',
    paddingHorizontal: SPACING.l,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: RADIUS.m,
    backgroundColor: COLORS.mutedBg,
  },
  adTag: {
    position: 'absolute',
    right: SPACING.l + 8,
    bottom: 8,
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

export default AdSheetCard;
