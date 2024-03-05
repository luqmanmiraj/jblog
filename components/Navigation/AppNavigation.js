// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import HomeScreen from '../../Screens/HomeScreen';
// import SubCategories from '../../Screens/SubCategories';
// import ArticleScreen from '../../Screens/ArticleScreen';
// import HTMLScreen from '../../Screens/HTMLScreen';
// import DrawerNavigator from './DrawerNavigator';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// export default function AppNavigation() {
//   return (
 
//       <Drawer.Navigator initialRouteName="HomeStack">
//         <Drawer.Screen name="HomeStack" component={HomeStack} />
//       </Drawer.Navigator>
   
//   );
// }

// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="SubCategories" component={SubCategories} />
//     <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
//     <Stack.Screen name="HTMLScreen" component={HTMLScreen} />
//   </Stack.Navigator>
// );





import React, { useContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../../Screens/HomeScreen';
import SubCategories from '../../Screens/SubCategories';
import ArticleScreen from '../../Screens/ArticleScreen';
import HTMLScreen from '../../Screens/HTMLScreen';
import DrawerNavigator from './DrawerNavigator';
import { DataContext } from '../DataContext';
import SubcategoriesScreen from '../../Screens/SubCategories';

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  const navigation = useNavigation();
  const { data } = useContext(DataContext); 

  const CustomDrawer = () => { // No need for `navigation` prop here
    return (
      <ScrollView>
        {data &&
          data.map((category) => (
            <TouchableOpacity key={category.categoryId} onPress={() => {
              // Access navigation using the hook within the component
           
              navigation.navigate('SubCategories', { category }); // Navigate to SubCategories screen, passing category as params
            }}>
              <Text>{category.category}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    );
  };
  

  return (
 
      <Drawer.Navigator initialRouteName="Home" drawerContent={() => <CustomDrawer data={data} />}>
         <Drawer.Screen name="BLOG APP" component={HomeStack}      options={{
      drawerItemStyle: { backgroundColor: '#FF4500' },
    }}

    />
      <Drawer.Screen name="CHAPTERS" component={SubcategoriesScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="ARTICLES" component={ArticleScreen} options={{ headerShown: false }} />
      </Drawer.Navigator>
   
  );
}

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}  />
    <Stack.Screen name="SubCategories" component={SubCategories}  options={{
      drawerItemStyle: { backgroundColor: '#FF4500' },
    }}/>
    <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
    <Stack.Screen name="HTMLScreen" component={HTMLScreen} />
  </Stack.Navigator>
);
