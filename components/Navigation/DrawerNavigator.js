

import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../Screens/HomeScreen';
import SubcategoriesScreen from '../../Screens/SubCategories'; 
import ArticleScreen from '../../Screens/ArticleScreen'; 
import { useNavigation } from '@react-navigation/native';
import CustomDrawerContent from '../customDrawerContent'; 
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DataContext } from '../DataContext';

const Drawer = createDrawerNavigator();

const CustomDrawer = ({ data }) => { 

  return (
    <ScrollView style={{flex:1}}>
      {data &&
        data.map((category) => (
          <TouchableOpacity key={category.categoryId} onPress={() => {
            const navigation = useNavigation();
            navigation.navigate('SubCategories', { category }); 
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

