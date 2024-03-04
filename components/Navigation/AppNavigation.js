import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../Screens/HomeScreen';
import SubCategories from '../../Screens/SubCategories';
import ArticleScreen from '../../Screens/ArticleScreen';
import HTMLScreen from "../../Screens/HTMLScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name='SubCategories' options={{ headerShown: false }} component={SubCategories} />
        <Stack.Screen name='ArticleScreen' options={{ headerShown: false }} component={ArticleScreen} />
        <Stack.Screen name='HTMLScreen' options={{ headerShown: false }} component={HTMLScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

