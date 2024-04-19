import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function SubcategoriesScreen() {
  console.log("inside subcategories");
  const navigation = useNavigation();
  const route = useRoute();

  const { category } = route.params;

  const handleSubCategoryPress = (subcategory) => {
    navigation.navigate("ArticleScreen", { subcategory });
  };

  return (
    <View style={styles.main}>
      <View style={{  flexDirection: 'row',
    padding: 10,
    paddingRight:0,
    paddingBottom:20,
    flex:0,
   }}>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>

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
    fontSize: 16,
    borderWidth: 1,
    fontWeight: "600",
    backgroundColor: "white",
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
    margin:10,
    marginTop: 5,
  },


});