
// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
// import DummyData from "../components/DummyData.json";
// import { DataContext } from '../components/DataContext';
// export default function HomeScreen() {
//   const navigation = useNavigation();
//   // const [data, setData] = useState([]);
//   const { data, handleCategoryPress } = useContext(DataContext);
//   useEffect(() => {
//     setData(DummyData);
//   }, []);

//   // const handleCategoryPress = (category) => {
//   //   navigation.navigate("SubCategories", { category });
//   // };

//   return (
//     <View style={styles.main}>
//       {/* Bar Icon on the top left corner */}
//       <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.iconContainer}>
//         <Icon name="bars" size={30} color="#FF4500" />
//       </TouchableOpacity>

//       <Text style={styles.navtext}>HomeScreen</Text>

//       {/* Display categories with onPress handling on the screen */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
//         {data.map((category) => (
//           <TouchableOpacity key={category.categoryId} onPress={() => handleCategoryPress(category)}>
//             <View>
//               <Text style={styles.content}>{category.category}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }




import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../components/DataContext'; // Import DataContext

export default function HomeScreen() {
  const navigation = useNavigation();
  const { data, handleCategoryPress } = useContext(DataContext); // Access data and handleCategoryPress from context

  return (
    <View style={styles.main}>
      {/* Bar Icon on the top left corner */}
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.iconContainer}>
        <Icon name="bars" size={30} color="#FF4500" />
      </TouchableOpacity>

      <Text style={styles.navtext}>HomeScreen</Text>

      {/* Display categories with onPress handling on the screen */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {data.map((category) => (
          <TouchableOpacity key={category.categoryId} onPress={() => handleCategoryPress(category)}>
            <View>
              <Text style={styles.content}>{category.category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding:10,
    flex:1,
    backgroundColor: "#00001C"
  },
 
  content: {
  
    color: "#FF4500",
    fontSize: 20,
    borderWidth: 1,
    fontWeight: "600",
    backgroundColor: "white",
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
    margin:10
  },

  scrollContainer: {
    paddingVertical: 10,
   
  },

});
