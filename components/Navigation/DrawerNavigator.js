

import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../Screens/HomeScreen';
import SubcategoriesScreen from '../../Screens/SubCategories'; // Import SubcategoriesScreen
import ArticleScreen from '../../Screens/ArticleScreen'; // Import ArticleScreen
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import CustomDrawerContent from '../customDrawerContent'; // Import CustomDrawerContent
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DataContext } from '../DataContext';

const Drawer = createDrawerNavigator();

const CustomDrawer = ({ data }) => { // No need for `navigation` prop here

  return (
    <ScrollView style={{flex:1}}>
      {data &&
        data.map((category) => (
          <TouchableOpacity key={category.categoryId} onPress={() => {
            // Access navigation using the hook within the component
            const navigation = useNavigation();
            navigation.navigate('SubCategories', { category }); // Navigate to SubCategories screen, passing category as params
          }}>
            <Text style={{backgroundColor:"#FF4500"}}>{category.category}</Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default function DrawerNavigator() {
  const { data } = useContext(DataContext); // Access data from context

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={() => <CustomDrawer data={data} />} // Pass data
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Subcategories" component={SubcategoriesScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Articles" component={ArticleScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

