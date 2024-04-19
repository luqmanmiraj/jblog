

import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {HTMlData} from "../components/HTMLData.js";


const ArticleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { subcategory } = route.params;

  //if subcategory and its articles are defined
  if (!subcategory || !subcategory.articles) {
    return (
      <View>
        <Text>Error: Invalid data</Text>
      </View>
    );
  }

  const handleHTMLdata = (article) => {
   
    navigation.navigate("HTMLScreen", { article });
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
