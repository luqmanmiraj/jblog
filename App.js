import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './components/Navigation/AppNavigation';
import {DataProvider} from './components/DataContext';
import {CategoryProvider} from './components/Context/BreadcrumbContext';
import {StatusBar} from 'react-native';

export default function App() {
  return (
    <CategoryProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <AppNavigation />
      </NavigationContainer>
    </CategoryProvider>
  );
}
