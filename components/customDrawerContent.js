// // CustomDrawerContent.js
// import React from 'react';
// import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// const CustomDrawerContent = ({ data }) => {
//   const navigation = useNavigation();
  
//   const { data } = useContext(DataContext);

//   return (
//     <ScrollView>
//     {data && data.map((category) => (
//       <TouchableOpacity key={category.categoryId} onPress={() => handleCategoryPress(category)}>
//         <Text style={styles.content}>{category.category}</Text>
//       </TouchableOpacity>
//     ))}
//   </ScrollView>
//   );
// };


import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../components/DataContext';

const CustomDrawerContent = () => {
  const navigation = useNavigation();
  const { data, handleCategoryPress } = useContext(DataContext);

  return (
    <ScrollView>
      {data &&
        data.map((category) => (
          <TouchableOpacity key={category.categoryId} onPress={() => handleCategoryPress(category)}>
            <Text>{category.category}</Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};



export default CustomDrawerContent;


const styles = StyleSheet.create({
  content: {
    color: "#FF4500",
    fontSize: 20,
    borderWidth: 1,
    fontWeight: "600",
    backgroundColor: "green",
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
    margin: 10
  },
});
