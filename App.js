import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './components/Navigation/AppNavigation';
import { DataProvider } from './components/DataContext';
import FirebaseNotification from './components/FirebaseNotifications';
export default function App() {
  return (
    <NavigationContainer >
      <DataProvider>
      <FirebaseNotification/>
        <AppNavigation />

      </DataProvider>
    </NavigationContainer>
  );
}
