import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../features/home/screens/HomeScreen';
import { PlayScreen } from '../features/play';
import CategoryScreen from '../features/category/screens/CategoryScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import CartScreen from '../features/cart/screens/CartScreen';

import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2874F0', // Flipkart blue as seen in design ref
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          elevation: 0,
          shadowOpacity: 0,
          height: 58,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcon name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Play"
        component={PlayScreen}
        options={{
          tabBarLabel: 'Play',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcon name={focused ? 'play-circle' : 'play-circle-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcon name={focused ? 'view-grid' : 'view-grid-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcon name={focused ? 'account' : 'account-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcon name={focused ? 'cart' : 'cart-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
