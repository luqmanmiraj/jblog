
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
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import SearchFunctionality from '../SearchFunctionality';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  const navigation = useNavigation();
  const { data } = useContext(DataContext); 
  const SearchFunctionality = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const filteredArticles = data.flatMap(category => category.subcategories)
                                  .flatMap(subcategory => subcategory.articles)
                                  .filter(article => article.article.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <ScrollView>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
          placeholder="Search articles"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        {filteredArticles.map((article) => (
          <TouchableOpacity key={article.articleId} onPress={() => {
            // Navigate to the specific article screen
          }}>
            <Text style={{ padding: 10 }}>{article.article}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };



  const CustomDrawer = () => { 
    return (
      <ScrollView>
        {data &&
          data.map((category) => (
            <TouchableOpacity   key={category.categoryId} onPress={() => {
              // Access navigation using the hook within the component
           
              navigation.navigate('SubCategories', { category }); 
             
            }}>
            <Text
  style={{
    color: "#FF4500",
    padding: 10,
    paddingLeft: 20,
    // borderColor: "gray",
    fontWeight:900,
    // borderRadius: 4,
    fontSize: 18,
    marginTop: 20,
    // backgroundColor: "#FFF",
    // borderWidth: 1, 
  }}
>
  {category.category}
</Text>

            </TouchableOpacity>
          ))}
      </ScrollView>
    );
  };
  

  return (
 
      <Drawer.Navigator initialRouteName="Home"  drawerContent={() => <CustomDrawer data={data} />}>
         <Drawer.Screen name="BLOG APP" component={HomeStack} options={{
        headerStyle: {
          backgroundColor: '#00001C', // Background color for the header
        },
        headerTintColor: 'white', // Color of the text in the header
        headerTitleAlign: 'center', // Aligns the text in the center of the header
        drawerStyle: { 
          backgroundColor: '#00001C' // Background color for the drawer
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              // Your navigation logic here, e.g., navigate to search screen
              navigation.navigate('SearchScreen');
            }}
            style={{ marginRight: 15 }}
          >
            <Icon name="search" size={18} color="white" onPress={SearchFunctionality} />

          </TouchableOpacity>
        ),
      }} />
      <Drawer.Screen name="CHAPTERS" component={SubcategoriesScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="ARTICLES" component={ArticleScreen} options={{ headerShown: false }} />
      </Drawer.Navigator>
   
  );
}

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}  />
    <Stack.Screen name="SubCategories" component={SubCategories}  options={{ headerShown: false }}/>
    <Stack.Screen name="ArticleScreen" component={ArticleScreen} options={{ headerShown: false }} />
    <Stack.Screen name="HTMLScreen" component={HTMLScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);


