import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function SubcategoriesScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { category } = route.params;

  const handleSubCategoryPress = (subcategory) => {
    // Pass the entire subcategory object to the ArticleScreen
    navigation.navigate("ArticleScreen", { subcategory });
  };

  return (
    <View style={styles.main}>
      <Text style={styles.navtext}>{category.category}</Text>
      {/* Use ScrollView for horizontal scrolling */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {/* Display subcategories for the selected category */}
        {category.subcategories.map((subcategory) => (
          <TouchableOpacity
            key={subcategory.subcategoryId}
            onPress={() => handleSubCategoryPress(subcategory)}
            style={styles.contentcontainer}
          >
          <View>
            <Text style={styles.content}>{subcategory.subcategory}</Text>
          
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