import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './components/Navigation/AppNavigation';
import { DataProvider } from './components/DataContext';

export default function App() {
  return (
    <NavigationContainer>
      <DataProvider>
        <AppNavigation />
      </DataProvider>
    </NavigationContainer>
  );
}
