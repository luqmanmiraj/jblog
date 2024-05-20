

// import React, {useContext, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import DummyData from '../components/DummyData.json';
// import LocationService from '../components/Location';
// import Services from '../components/Services';

// export default function HomeScreen() {
//   const navigation = useNavigation();
//   const [data, setData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     setData(DummyData);
//     //  first category is selected by default
//     if (DummyData.length > 0) {
//       setSelectedCategory(DummyData[0]);
//     }
//   }, []);

//   const handleCategoryPress = category => {
//     setSelectedCategory(category);
//     navigation.navigate('SubCategories', {category});
//   };

//   return (
//     <View style={styles.main}>
//       <View
//         style={{
//           flexDirection: 'row',
//           padding: 10,
//           paddingRight: 0,
//           paddingBottom: 20,
//           flex: 0,
//         }}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={true}>
//           {data.map(category => (
//             <TouchableOpacity
//               key={category.categoryId}
//               onPress={() => handleCategoryPress(category)}>
//               <View
//                 style={{
//                   borderBottomWidth: 2,
//                   borderBottomColor:
//                     selectedCategory === category ? '#FF4500' : 'transparent',
//                 }}>
//                 <Text style={styles.content}>{category.category}</Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
//       <View style={styles.barContainer}>
//         <View style={styles.bar}>
          
//        <LocationService />
//       </View>

      
//         </View> 

//         {/* <Services/>   */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   main: {
//     padding: 20,
//     flex: 1,
//     backgroundColor: '#00001C',
//   },
//   barContainer: {
//     marginTop: 25,
//     borderColor: 'white',
//     borderWidth: 1,
//     borderRadius: 15,
//     padding: 5,
//    marginLeft:10,
//     height: '40%',
   
   
//   },
//   bar: {
//     flex: 1,
//   },

//   content: {
//     fontSize: 16,
//     marginLeft: 10,
//     marginRight:13,
//     color: 'white',
//   },
// });



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    navigation.navigate('SubCategories', { category: category });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items'
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderData = () => {
    if (!Array.isArray(data)) {
      return <Text style={styles.content}>No data available</Text>;
    }
    return data.map((item, index) => (
      <TouchableOpacity key={index} onPress={() => handleCategoryPress(item)}>
        <View style={styles.item}>
          <Text style={styles.content}>{item || 'null'}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.main}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={styles.container}>
          {renderData()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
    flex: 1,
    backgroundColor: '#00001C',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  content: {
    fontSize: 16,
    color: '#FF4500',
  },
});
