// // AppNavigation.js
// import React, { useContext, useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import HomeScreen from '../../Screens/HomeScreen';
// import SubCategories from '../../Screens/SubCategories';
// import ArticleScreen from '../../Screens/ArticleScreen';
// import HTMLScreen from '../../Screens/HTMLScreen';
// import SearchFunctionalityScreen from '../../Screens/SearchFunctionalityScreen';
// import { DataContext } from '../DataContext';
// import SubcategoriesScreen from '../../Screens/SubCategories';

// import { EvilIcons } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons/Feather';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {CategoryContext} from "../Context/BreadcrumbContext"

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();



// const HomeStack = () => {

//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SubCategories"
//         component={SubCategories}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ArticleScreen"
//         component={ArticleScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="HTMLScreen"
//         component={HTMLScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SearchFunctionalityScreen"
//         component={SearchFunctionalityScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };
//   // Conditional title rendering
//   const getTitle = () => {
//     if (crumbcategory && crumbsubcategory) {
//       return `${crumbcategory} > ${crumbsubcategory}`;
//     } else if (crumbcategory) {
//       return crumbcategory;
//     } else {
//       return "Tech";
//     }
//   };

// const AppNavigation = () => {
//   const [fetchedData, setFetchedData] = useState([]);
//   const navigation = useNavigation();

//   const { crumbcategory } = useContext(CategoryContext);
// const { crumbsubcategory } = useContext(CategoryContext);
// console.log("crumbcategory value, ", crumbcategory);
// console.log("crumbsubcategory value, ", crumbsubcategory);
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         'https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items'
//       );
//       const jsonData = await response.json();
//       setFetchedData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const CustomDrawer = () => {
//     return (
//       <ScrollView style={{ marginTop: 20 }}>
//         {fetchedData &&
//           fetchedData.map((category, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => {
//                 navigation.navigate('SubCategories', { category });
//               }}>
//               <Text
//                 style={{
//                   color: 'white',
//                   padding: 10,
//                   paddingLeft: 20,
//                   fontWeight: 900,
//                   fontSize: 18,
//                   marginTop: 20,
//                   letterSpacing: 1
//                 }}>
//                 {category}
//               </Text>
//             </TouchableOpacity>
//           ))}
//       </ScrollView>
//     );
//   };

//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       drawerContent={() => <CustomDrawer />}>
//       <Drawer.Screen
//         name="BLOG APP"
//         component={HomeStack}
     
//         options={{
//           title:getTitle(),
//           headerStyle: {
//             backgroundColor: '#333333',
//           },
//           headerTintColor: "white",
//           headerTitleAlign: 'center',
//           drawerStyle: {
//             backgroundColor: '#333333',
//           },
//           headerRight: () => (
//             <TouchableOpacity style={{ marginRight: 15 }}>
//               <Icon
//                 name="home"
//                 size={18}
//                 color="white"
//                 onPress={() => {
//                   navigation.navigate('Home');
//                 }}
//               />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="CHAPTERS"
//         component={SubcategoriesScreen}
//         options={{ headerShown: false }}
//       />
//       <Drawer.Screen
//         name="ARTICLES"
//         component={ArticleScreen}
//         options={{ headerShown: false }}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default AppNavigation;












// import React, { useContext, useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import HomeScreen from '../../Screens/HomeScreen';
// import SubCategories from '../../Screens/SubCategories';
// import ArticleScreen from '../../Screens/ArticleScreen';
// import HTMLScreen from '../../Screens/HTMLScreen';
// import SearchFunctionalityScreen from '../../Screens/SearchFunctionalityScreen';
// import SubcategoriesScreen from '../../Screens/SubCategories';

// import { CategoryContext, SubCategoryContext } from '../Context/BreadcrumbContext';

// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// const HomeStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SubCategories"
//         component={SubCategories}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ArticleScreen"
//         component={ArticleScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="HTMLScreen"
//         component={HTMLScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SearchFunctionalityScreen"
//         component={SearchFunctionalityScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

// const AppNavigation = () => {
//   const [fetchedData, setFetchedData] = useState([]);
//   const navigation = useNavigation();
//   const { crumbcategory } = useContext(CategoryContext);
//   const { crumbsubcategory } = useContext(SubCategoryContext);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items');
//       const jsonData = await response.json();
//       setFetchedData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const CustomDrawer = () => {
//     return (
//       <ScrollView style={{ marginTop: 20 }}>
//         {fetchedData &&
//           fetchedData.map((category, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => {
//                 navigation.navigate('SubCategories', { category });
//               }}>
//               <Text
//                 style={{
//                   color: 'white',
//                   padding: 10,
//                   paddingLeft: 20,
//                   fontWeight: '900',
//                   fontSize: 18,
//                   marginTop: 20,
//                   letterSpacing: 1,
//                 }}>
//                 {category}
//               </Text>
//             </TouchableOpacity>
//           ))}
//       </ScrollView>
//     );
//   };

//   // Conditional title rendering
  
//   const getTitle = () => {
//     if (crumbcategory && crumbsubcategory) {
//       return `${crumbcategory} > ${crumbsubcategory}`;
//     } else if (crumbcategory) {
//       return crumbcategory;
//     } else {
//       return "Tech";
//     }
//   };

//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       drawerContent={() => <CustomDrawer />}
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#333333',
//         },
//         headerTintColor: "white",
//         headerTitleAlign: 'center',
//         drawerStyle: {
//           backgroundColor: '#333333',
//         },
//         headerRight: () => (
//           <TouchableOpacity style={{ marginRight: 15 }}>
//             <Icon
//               name="home"
//               size={18}
//               color="white"
//               onPress={() => {
//                 crumbcategory('');
//                 crumbsubcategory('');
//                 navigation.navigate('Home');
//               }}
//             />
//           </TouchableOpacity>
//         ),
//       }}
//     >
//       <Drawer.Screen
//         name="BLOG APP"
//         component={HomeStack}
//         options={{
//           title: getTitle(),
//              drawerContentStyle:{
//             backgroundColor:"#c6cbef",
//           }
//         }}
     
//       />
//       <Drawer.Screen
//         name="CHAPTERS"
//         component={SubcategoriesScreen}
//         options={{ headerShown: false }}
//       />
//       <Drawer.Screen
//         name="ARTICLES"
//         component={ArticleScreen}
//         options={{ headerShown: false }}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default AppNavigation;








import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../../Screens/HomeScreen';
import SubCategories from '../../Screens/SubCategories';
import ArticleScreen from '../../Screens/ArticleScreen';
import HTMLScreen from '../../Screens/HTMLScreen';
import SearchFunctionalityScreen from '../../Screens/SearchFunctionalityScreen';
import SubcategoriesScreen from '../../Screens/SubCategories';

import { CategoryContext, SubCategoryContext } from '../Context/BreadcrumbContext';

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
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

const AppNavigation = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const navigation = useNavigation();
  const { crumbcategory, setCategory } = useContext(CategoryContext);
  const { crumbsubcategory, setSubcategory } = useContext(SubCategoryContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items');
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
          fetchedData.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCategory('');  
                setSubcategory('');
                navigation.navigate('SubCategories', { category });
              }}>
              <Text
                style={{
                  color: 'white',
                  padding: 10,
                  paddingLeft: 20,
                  fontWeight: '900',
                  fontSize: 18,
                  marginTop: 20,
                  letterSpacing: 1,
                }}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    );
  };

  const getTitle = () => {
    if (crumbcategory && crumbsubcategory) {
      return `${crumbcategory} > ${crumbsubcategory}`;
    } else if (crumbcategory) {
      return crumbcategory;
    } else {
      return "Tech";
    }
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={() => <CustomDrawer />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#333333',
        },
        headerTintColor: "white",
        headerTitleAlign: 'center',
        drawerStyle: {
          backgroundColor: '#333333',
        },
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Icon
              name="home"
              size={18}
              color="white"
              onPress={() => {
                setCategory('');
                setSubcategory('');
                navigation.navigate('Home');
              }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="BLOG APP"
        component={HomeStack}
        options={{
          title: getTitle(),
          fontSize:18
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
};

export default AppNavigation;
