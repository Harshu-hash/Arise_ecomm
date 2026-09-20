import React, { useRef, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

const EXPANDED_HEIGHT = 66;

/**
 * "For You | Fashion | Mobiles | Electronics | Beauty ..." underline tab strip on Home.
 * A single shared underline slides + resizes to the clicked tab (measured tab positions,
 * animated with Animated.timing) instead of each tab toggling its own static bar.
 * When `scrollY` is provided, the icons shrink + fade away and the labels rise, in sync
 * with the header's own collapse — all transform/opacity only, driven by the SAME native
 * scrollY value as the header's translate, so they can never drift out of sync with it.
 *
 * NOTE: an earlier version also shrank the row's own height via a second, JS-driven
 * value (since `height` isn't native-driver compatible). That couldn't share a driver
 * with the native header translate, so under fast/scrolled states the two visibly
 * desynced — leaving gaps between the header and the content below it. Do not
 * reintroduce a height animation here; keep this row's own box height static and let
 * only transform/opacity move within it.
 */
const CategoryTabStrip = ({
  tabs,
  activeId,
  onSelect,
  style,
  scrollY,
  collapseDistance = 100,
}) => {
  const isIconAnimated = !!scrollY;
  const iconScale = isIconAnimated
    ? scrollY.interpolate({
        inputRange: [0, collapseDistance * 0.7],
        outputRange: [1, 0.4],
        extrapolate: 'clamp',
      })
    : 1;
  const iconOpacity = isIconAnimated
    ? scrollY.interpolate({
        inputRange: [0, collapseDistance * 0.45],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      })
    : 1;
  // Give the label extra clearance from the shrinking clip window's bottom edge —
  // otherwise it sits right at the boundary and gets sliced through mid-letter.
  const labelTranslateY = isIconAnimated
    ? scrollY.interpolate({
        inputRange: [0, collapseDistance * 0.7],
        outputRange: [0, -18],
        extrapolate: 'clamp',
      })
    : 0;

  // --- Sliding underline: measured tab positions -> a single animated indicator ---
  const tabLayoutsRef = useRef({});
  const hasPositionedRef = useRef(false);
  const underlineX = useRef(new Animated.Value(0)).current;
  const underlineWidth = useRef(new Animated.Value(0)).current;
  const underlineOpacity = useRef(new Animated.Value(0)).current;

  const moveUnderlineTo = (id, immediate) => {
    const layout = tabLayoutsRef.current[id];
    if (!layout) return;
    if (immediate) {
      underlineX.setValue(layout.x);
      underlineWidth.setValue(layout.width);
      underlineOpacity.setValue(1);
    } else {
      Animated.parallel([
        Animated.timing(underlineX, {
          toValue: layout.x,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(underlineWidth, {
          toValue: layout.width,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handleTabLayout = (id, e) => {
    const { x, width } = e.nativeEvent.layout;
    tabLayoutsRef.current[id] = { x, width };
    if (id === activeId && !hasPositionedRef.current) {
      hasPositionedRef.current = true;
      moveUnderlineTo(id, true);
    }
  };

  useEffect(() => {
    if (hasPositionedRef.current) {
      moveUnderlineTo(activeId, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.scrollView, style]}
      contentContainerStyle={styles.row}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.8}
            onPress={() => onSelect && onSelect(tab)}
            onLayout={(e) => handleTabLayout(tab.id, e)}
            style={styles.tab}>
            <Animated.View
              style={[
                styles.iconBox,
                isActive && styles.iconBoxActive,
                isIconAnimated && { opacity: iconOpacity, transform: [{ scale: iconScale }] },
              ]}>
              {tab.icon && (
                <Ionicons
                  name={tab.icon}
                  size={22}
                  color={COLORS.textPrimary}
                />
              )}
            </Animated.View>
            <Animated.View style={isIconAnimated && { transform: [{ translateY: labelTranslateY }] }}>
              <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}

      {/*
        Two nested Animated.Views on purpose: labelTranslateY is derived from the
        native-driven scrollY, while underlineX/underlineWidth are driven with
        useNativeDriver:false (Animated.timing on tab click, a plain layout-adjacent
        value). Mixing both driver types in a single style/transform array throws
        ("Attempting to run JS driven animation on animated node that has been moved
        to 'native'"), so each driver gets its own wrapper.
      */}
      <Animated.View
        pointerEvents="none"
        style={[styles.slidingUnderlineAnchor, { transform: [{ translateY: labelTranslateY }] }]}>
        <Animated.View
          style={[
            styles.slidingUnderline,
            {
              opacity: underlineOpacity,
              width: underlineWidth,
              transform: [{ translateX: underlineX }],
            },
          ]}
        />
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: EXPANDED_HEIGHT,
    flexGrow: 0,
  },
  row: {
    paddingHorizontal: SPACING.l,
    paddingBottom: 14,
    alignItems: 'flex-end',
  },
  tab: {
    alignItems: 'center',
    marginRight: SPACING.l,
  },
  iconBox: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -6,
  },
  iconBoxActive: {},
  label: {
    fontSize: 10.5,
    fontWeight: '500',
    color: 'rgba(33,33,33,0.7)',
  },
  labelActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  slidingUnderlineAnchor: {
    position: 'absolute',
    left: 0,
    bottom: 7,
  },
  slidingUnderline: {
    height: 3,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});

export default CategoryTabStrip;
