import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import AppNavigation from './components/Navigation/AppNavigation';
import Navbar from './components/Navbar';
import DrawerNavigator from './components/Navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';

import { DataProvider } from './components/DataContext';
export default function App() {
  return (

    <NavigationContainer>
    <DataProvider>

   
<DrawerNavigator/> 
</DataProvider>
    </NavigationContainer>

      
  );
}
