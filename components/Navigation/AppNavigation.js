// import React, { useContext } from 'react';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import HomeScreen from '../../Screens/HomeScreen';
// import SubCategories from '../../Screens/SubCategories';
// import ArticleScreen from '../../Screens/ArticleScreen';
// import HTMLScreen from '../../Screens/HTMLScreen';
// import DrawerNavigator from './DrawerNavigator';
// import { DataContext } from '../DataContext';
// import SubcategoriesScreen from '../../Screens/SubCategories';

// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// export default function AppNavigation() {
//   const navigation = useNavigation();
//   const { data } = useContext(DataContext);

//   const CustomDrawer = () => { // No need for `navigation` prop here
//     return (
//       <ScrollView>
//         {data &&
//           data.map((category) => (
//             <TouchableOpacity key={category.categoryId} onPress={() => {
//               // Access navigation using the hook within the component

//               navigation.navigate('SubCategories', { category }); // Navigate to SubCategories screen, passing category as params
//             }}>
//               <Text>{category.category}</Text>
//             </TouchableOpacity>
//           ))}
//       </ScrollView>
//     );
//   };

//   return (

//       <Drawer.Navigator initialRouteName="Home" drawerContent={() => <CustomDrawer data={data} />}>
//          <Drawer.Screen name="BLOG APP" component={HomeStack}      options={{
//       drawerItemStyle: { backgroundColor: '#FF4500' },
//     }}

//     />
//       <Drawer.Screen name="CHAPTERS" component={SubcategoriesScreen} options={{ headerShown: false }} />
//       <Drawer.Screen name="ARTICLES" component={ArticleScreen} options={{ headerShown: false }} />
//       </Drawer.Navigator>

//   );
// }

// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}  />
//     <Stack.Screen name="SubCategories" component={SubCategories}  options={{
//       drawerItemStyle: { backgroundColor: '#FF4500' },
//     }}/>
//     <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
//     <Stack.Screen name="HTMLScreen" component={HTMLScreen} />
//   </Stack.Navigator>
// );

// import React, {useContext,useState} from 'react';
// import {NavigationContainer, useNavigation} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';

// import HomeScreen from '../../Screens/HomeScreen';
// import SubCategories from '../../Screens/SubCategories';
// import ArticleScreen from '../../Screens/ArticleScreen';
// import HTMLScreen from '../../Screens/HTMLScreen';
// import SearchFunctionalityScreen from '../../Screens/SearchFunctionalityScreen';
// import DrawerNavigator from './DrawerNavigator';
// import {DataContext} from '../DataContext';
// import SubcategoriesScreen from '../../Screens/SubCategories';
// import {EvilIcons} from '@expo/vector-icons';
// import {Feather} from '@expo/vector-icons/Feather';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import FirebaseNotification from '../FirebaseNotifications';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   ScrollView,
// } from 'react-native';

// export default function AppNavigation() {
  
//   const Drawer = createDrawerNavigator();
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigation = useNavigation();
//   const {data} = useContext(DataContext);



//   const CustomDrawer = () => {
//     return (
//       <ScrollView      style={{marginTop: 20}}>
//         {data &&
//           data.map(category => (
//             <TouchableOpacity
              
//               key={category.categoryId}
//               onPress={() => {
//                 navigation.navigate('SubCategories', {category});
              
//               }}>
           
//               <Text
//                 style={{
//                   color: 'white',
//                   padding: 10,
//                   paddingLeft: 20,
//                   // borderColor: "gray",
//                   fontWeight: 900,
//                   // borderRadius: 4,
//                   fontSize: 18,
//                   marginTop: 20,
//                   // backgroundColor: "#FFF",
//                   // borderWidth: 1,
//                 }}>
//                 {category.category}
//               </Text>
//             </TouchableOpacity>
//           ))}
//       </ScrollView>
//     );
//   };

//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
      
//       drawerContent={() =>  <CustomDrawer  data={data}   
  
      
//          />}>
//       <Drawer.Screen
//         name="BLOG APP"
//         component={HomeStack}
//         options={{
//           headerStyle: {
//             backgroundColor: '#00001C', 
//           },
//           headerTintColor: 'white', 
//           headerTitleAlign: 'center', 
//           drawerStyle: {
//             backgroundColor: '#00001C',
//           },
//           headerRight: () => (
//             <TouchableOpacity
          
             
//               style={{marginRight: 15}}>
//               <Icon
//                 name="search"
//                 size={18}
//                 color="white"
//                 onPress={() => {
//                 navigation.navigate('SearchFunctionalityScreen');
              
//               }}
//               />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="CHAPTERS"
//         component={SubcategoriesScreen}
//         options={{headerShown: false}}
//       />
//       <Drawer.Screen
//         name="ARTICLES"
//         component={ArticleScreen}
//         options={{headerShown: false}}
//       />

//     </Drawer.Navigator>
//   );

//       }

// const HomeStack = () => {
//   const Stack = createNativeStackNavigator();
//   return(
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       name="SubCategories"
//       component={SubCategories}
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       name="ArticleScreen"
//       component={ArticleScreen}
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       name="HTMLScreen"
//       component={HTMLScreen}
//       options={{headerShown: false}}
//     />
//      <Stack.Screen
//       name="SearchFunctionalityScreen"
//       component={SearchFunctionalityScreen}
//       options={{headerShown: false}}
//     />
//   </Stack.Navigator>
//   ) 
//   }





// AppNavigation.js
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../../Screens/HomeScreen';
import SubCategories from '../../Screens/SubCategories';
import ArticleScreen from '../../Screens/ArticleScreen';
import HTMLScreen from '../../Screens/HTMLScreen';
import SearchFunctionalityScreen from '../../Screens/SearchFunctionalityScreen';
import DrawerNavigator from './DrawerNavigator';
import { DataContext } from '../DataContext';
import SubcategoriesScreen from '../../Screens/SubCategories';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirebaseNotification from '../FirebaseNotifications';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

export default function AppNavigation() {
  const Drawer = createDrawerNavigator();
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items'
      );
      const jsonData = await response.json();
      setFetchedData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const CustomDrawer = () => {
    return (
      <ScrollView style={{ marginTop: 20 }}>
        {fetchedData &&
          fetchedData.map((category,index) => (
            <TouchableOpacity
             key={index}
              onPress={() => {
                navigation.navigate('SubCategories', { category });
              }}>
              <Text
                style={{
                  color: 'white',
                  padding: 10,
                  paddingLeft: 20,
                  fontWeight: 900,
                  fontSize: 18,
                  marginTop: 20,
                }}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={() => <CustomDrawer />}>
      <Drawer.Screen
        name="BLOG APP"
        component={HomeStack}
        options={{
          headerStyle: {
            backgroundColor: '#00001C',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          drawerStyle: {
            backgroundColor: '#00001C',
          },
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Icon
                name="search"
                size={18}
                color="white"
                onPress={() => {
                  navigation.navigate('SearchFunctionalityScreen');
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="CHAPTERS"
        component={SubcategoriesScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="ARTICLES"
        component={ArticleScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubCategories"
        component={SubCategories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArticleScreen"
        component={ArticleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HTMLScreen"
        component={HTMLScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchFunctionalityScreen"
        component={SearchFunctionalityScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
