


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ArticleScreen({ route }) {
  const { category, subcategory } = route.params;
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const navigation = useNavigation();

  const handleArticlePress = (article) => {
    setSelectedArticle(article)
    navigation.navigate('HTMLScreen', { article: article.title, id: article.id, type: article.type });
  }

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://4uvh5c5t2g.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}&parent=${subcategory}`,
        );
        const jsonData = await response.json();
        setArticles(jsonData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [category, subcategory]);

  return (
    <View style={styles.main}>
      <Text style={styles.TextHeading}>Articles</Text>
      <Text style={styles.header}>{category} / {subcategory}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {articles.map((article, index) => (
          <TouchableOpacity key={index} onPress={() => handleArticlePress(article)}>
            <View style={styles.item}>
              <Text style={styles.content}>{article.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 20,
    flex: 1,
    backgroundColor: '#153448',
  },
  scrollView: {
    flexGrow: 1,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#FFFFFF1A',
    width: '100%',
    borderColor:"#FFFFFF99",
    borderWidth:1,
    borderRadius:10
  },
  content: {
    fontSize: 16,
    color: 'white',
  },
  header: {
    color: "#66E4FE",
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize:20,
  },
  TextHeading: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
});
