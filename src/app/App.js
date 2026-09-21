import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from '@theme';
import { COLORS } from '../constants/colors';
import { StatusBarManager } from '../shared/components';
import { BrandSwitchLoaderProvider } from '../contexts/BrandSwitchLoaderContext';
import RootNavigator from '../navigation/RootNavigator';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <ThemeProvider>
          <StatusBarManager barStyle="dark-content" themeColor={COLORS.surface} />
          <BrandSwitchLoaderProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </BrandSwitchLoaderProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

export default App;
