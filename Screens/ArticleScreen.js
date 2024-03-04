

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {HTMlData} from "../components/HTMLData.js";


const ArticleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { subcategory } = route.params;

  // Check if subcategory and its articles are defined
  if (!subcategory || !subcategory.articles) {
    return (
      <View>
        <Text>Error: Invalid data</Text>
      </View>
    );
  }

  const handleHTMLdata = (article) => {
    // Pass the selected article to the HTMLData component
    navigation.navigate("HTMLScreen", { article });
  };

  return (
    <View style={styles.main}>
      <Text style={styles.navtext}>{subcategory.subcategory}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
      {subcategory.articles.map((article) => (
        <TouchableOpacity
          key={article.articleId}
          onPress={() => handleHTMLdata(article)}
         
        >
        <View>

          <Text style={styles.content}>{article.article}</Text>
        </View>
        </TouchableOpacity>
      ))
      }</ScrollView>
    </View>
    
  );
};

export default ArticleScreen;


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
