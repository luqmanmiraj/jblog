// // import React from 'react';
// // import { createDrawerNavigator } from '@react-navigation/drawer';
// // import HomeScreen from '../../Screens/HomeScreen';

// // const Drawer = createDrawerNavigator();

// // export default function DrawerNavigator() {
// //   return (
// //     <Drawer.Navigator>
// //       <Drawer.Screen name="Home" component={HomeScreen} />
// //       {/* Add more screens for other categories or subcategories if needed */}
// //     </Drawer.Navigator>
// //   );
// // }




// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeScreen from '../../Screens/HomeScreen';
// import SubcategoriesScreen from '../../Screens/SubCategories';
// import ArticleScreen from '../../Screens/ArticleScreen';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="home" component={HomeScreen}   options={{ headerShown: false }} />
//       {/* <Drawer.Screen name="Subcategories" component={SubcategoriesScreen}   options={{ headerShown: false }} />
//       <Drawer.Screen name="Articles" component={ArticleScreen}   options={{ headerShown: false }} /> */}
//       {/* Add more screens for other categories if needed */}
//     </Drawer.Navigator>
//   );
// }




import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../Screens/HomeScreen';

import CustomDrawerContent from '../customDrawerContent'; // Import CustomDrawerContent
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DataContext } from '../DataContext';
const Drawer = createDrawerNavigator();

const CustomDrawer = ({ data }) => { // Pass data to CustomDrawer as a prop
  return (
    <ScrollView>
      {data &&
        data.map((category) => (
          <TouchableOpacity key={category.categoryId} onPress={() => { /* Handle category press */ }}>
            <Text >{category.category}</Text>
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
      drawerContent={() => <CustomDrawer data={data} />} // Pass data to CustomDrawer
    >
      <Drawer.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
