// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import DummyData from "../components/DummyData.json";
// import LocationService from '../components/Location';
// export default function HomeScreen() {
//   const navigation = useNavigation();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(DummyData);
//   }, []);

//   const handleCategoryPress = (category) => {
//     navigation.navigate("SubCategories", { category });
//   };

//   return (
//     <View style={styles.main}>
//   <View style={{  flexDirection: 'row',
//     padding: 10,
//     paddingRight:0,
//     paddingBottom:20,
//     flex:0,
//    }}>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false} >
//         {data.map((category) => (
//           <TouchableOpacity key={category.categoryId} onPress={() => handleCategoryPress(category)}>
//             <View >
//               <Text style={styles.content}>{category.category}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       </View>
//       <LocationService/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   main: {
//     padding:10,
//     paddingTop:5,
//     flex:1,
//     backgroundColor: "#00001C",

//   },

//   content: {

//     color: "white",
//     fontSize: 16,
//     // borderWidth: 1,
//     fontWeight: "600",

//    borderColor: "grey",
//     padding: 0,
//     // borderRadius: 5,
//     margin:10,
//     // marginTop: 5,
//   },

// });

import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DummyData from '../components/DummyData.json';
import LocationService from '../components/Location';
import Services from '../components/Services';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setData(DummyData);
    //  first category is selected by default
    if (DummyData.length > 0) {
      setSelectedCategory(DummyData[0]);
    }
  }, []);

  const handleCategoryPress = category => {
    setSelectedCategory(category);
    navigation.navigate('SubCategories', {category});
  };

  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          paddingRight: 0,
          paddingBottom: 20,
          flex: 0,
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          {data.map(category => (
            <TouchableOpacity
              key={category.categoryId}
              onPress={() => handleCategoryPress(category)}>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor:
                    selectedCategory === category ? '#FF4500' : 'transparent',
                }}>
                <Text style={styles.content}>{category.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.barContainer}>
        <View style={styles.bar}>
          
       <LocationService />
      </View>

      
        </View> 

        {/* <Services/>   */}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 20,
    flex: 1,
    backgroundColor: '#00001C',
  },
  barContainer: {
    marginTop: 25,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
   marginLeft:10,
    height: '40%',
   
   
  },
  bar: {
    flex: 1,
  },

  content: {
    fontSize: 16,
    marginLeft: 10,
    marginRight:13,
    color: 'white',
  },
});
