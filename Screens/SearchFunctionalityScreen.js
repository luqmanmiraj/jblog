


import React, { useState, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../components/DataContext';

export default function SearchFunctionalityScreen() {
  const { data } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = () => {
    const results = data.reduce((acc, category) => {
      const matchingCategory = category.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchingSubcategories = category.subcategories.filter(subcategory =>
        subcategory.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchingArticles = category.subcategories.flatMap(subcategory =>
        subcategory.articles.filter(article =>
          article.article.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(article => ({
          categoryId: category.categoryId,
          category: category.category,
          subcategoryId: subcategory.subcategoryId,
          subcategory: subcategory.subcategory,
          articleId: article.articleId,
          article: article.article
        }))
      );
      if (matchingCategory || matchingSubcategories.length > 0 || matchingArticles.length > 0) {
        acc.push({
          ...category,
          subcategories: matchingSubcategories,
          articles: matchingArticles
        });
      }
      return acc;
    }, []);
    setSearchResults(results);
  };



  const navigateToItem = (item) => {
    if (item.articleId) {

      navigation.navigate('ArticleScreen', { articleId: item.articleId });
    } else if (item.subcategoryId) {
 
      const category = data.find(category => category.categoryId === item.categoryId);
      if (category) {

        const subcategory = category.subcategories.find(subcategory => subcategory.subcategoryId === item.subcategoryId);
        if (subcategory) {

          navigation.navigate('SubCategories', { subcategoryId: subcategory.subcategoryId });
        }
      }
    } else if (item.categoryId) {
    
      navigation.navigate('SubCategories', { categoryId: item.categoryId });
    }
  };
  

  return (
    <View style={{backgroundColor:"#00001C", flex:1}}>
      <TextInput
      
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10 , backgroundColor:"white"}}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToItem(item)}>
            <View style={{ padding: 10 ,backgroundColor:"#00001C"}}>
              <Text style={{ fontWeight: 'bold',color:"#FF4500" }}>{item.category}</Text>
              {item.subcategories && item.subcategories.map(subcategory => (
                <TouchableOpacity
               
                  key={subcategory.subcategoryId}
                  onPress={() => navigateToItem(subcategory)}
                  style={{ paddingLeft: 10}}
                >
                  <Text style={{ color:"white", margin:2}}>{subcategory.subcategory};</Text>
                </TouchableOpacity>
              ))}
              {item.articles && item.articles.map(article => (
                <TouchableOpacity
                  key={article.articleId}
                  onPress={() => navigateToItem(article)}
                  style={{ paddingLeft: 10,color:"white" }}
                >
                  <Text  style={{ color:"white", margin:2}}>{article.article}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
