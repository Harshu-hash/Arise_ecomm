import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import CategoryScreen from '../features/category/screens/CategoryScreen';
import ProductDetailScreen from '../features/product/screens/ProductDetailScreen';
import SearchScreen from '../features/search/screens/SearchScreen';
import CartScreen from '../features/cart/screens/CartScreen';
import TrackingScreen from '../features/tracking/screens/TrackingScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import AccountSettingsScreen from '../features/profile/screens/AccountSettingsScreen';
import OffersScreen from '../features/offers/screens/OffersScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <Stack.Screen name="Offers" component={OffersScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
