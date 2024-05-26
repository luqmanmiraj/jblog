




import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ArticleScreen({route}) {
  const {category, subcategory} = route.params;
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);


  const navigation = useNavigation();

  const handleArticlePress=(article)=>{
    console.log("pressed,", article)
    setSelectedArticle(article)
    navigation.navigate('HTMLScreen', { article:article.title ,id:article.id});
  }

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://4uvh5c5t2g.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}&parent=${subcategory}`,
        );
        const jsonData = await response.json();
        console.log('Response:', jsonData); 
        setArticles(jsonData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
  
    fetchArticles();
  }, [category, subcategory]);
  
  return (
    <View style={styles.main}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        {articles.map((article, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleArticlePress(article)}>
            <View key={index} style={styles.item}>
              <Text style={styles.content}>{article.title} </Text>
              <Text style={styles.content}>{article.id} </Text>
           
            </View>
          </TouchableOpacity>
        ))}
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
