import React, { useRef, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

const EXPANDED_HEIGHT = 66;
const COLLAPSED_HEIGHT = 36;

/**
 * "For You | Fashion | Mobiles | Electronics | Beauty ..." underline tab strip on Home.
 * A single shared underline slides + resizes to the clicked tab (measured tab positions,
 * animated with Animated.timing) instead of each tab toggling its own static bar.
 * When `scrollY` is provided, the icons shrink + fade away in sync with the header's own
 * collapse (transform/opacity only, native thread, no jank). When `heightScrollY` is also
 * provided, the row's own reserved height shrinks too — via a fixed-size inner row bottom-
 * aligned inside a shrinking, clipped outer window, so the icon area gets cropped away
 * instead of just sitting there empty once the icons have faded out.
 */
const CategoryTabStrip = ({
  tabs,
  activeId,
  onSelect,
  style,
  scrollY,
  collapseDistance = 100,
  heightScrollY,
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

  const isHeightAnimated = !!heightScrollY;
  const rowHeight = isHeightAnimated
    ? heightScrollY.interpolate({
        inputRange: [0, collapseDistance],
        outputRange: [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
        extrapolate: 'clamp',
      })
    : EXPANDED_HEIGHT;

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
    <Animated.View
      style={[
        style,
        styles.clipWindow,
        isHeightAnimated ? { height: rowHeight } : { height: EXPANDED_HEIGHT },
      ]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
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

        <Animated.View
          pointerEvents="none"
          style={[
            styles.slidingUnderline,
            {
              opacity: underlineOpacity,
              width: underlineWidth,
              transform: [{ translateX: underlineX }],
            },
          ]}
        />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  clipWindow: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  scrollView: {
    height: EXPANDED_HEIGHT,
    flexGrow: 0,
  },
  row: {
    paddingHorizontal: SPACING.l,
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    marginRight: SPACING.l,
    paddingBottom: SPACING.xs,
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
  slidingUnderline: {
    position: 'absolute',
    left: 0,
    bottom: 4,
    height: 3,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});

export default CategoryTabStrip;
