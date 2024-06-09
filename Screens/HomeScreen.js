

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedSubCategories, setExpandedSubCategories] = useState({});
  const [expandedArticles, setExpandedArticles] = useState({});
  const [data, setData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadCachedData();
    
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchDataInBackground();
  }, []);

  const loadCachedData = async () => {
    try {
      const cachedDataString = await AsyncStorage.getItem('categoriesWithSubcategories');
      if (cachedDataString) {
        const cachedData = JSON.parse(cachedDataString);
        setData(cachedData.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading cached data:', error);
      setIsLoading(false);
    }
  };

  const fetchDataInBackground = async () => {
    try {
      const response = await fetch(
        'https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items'
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const categories = await response.json();

      const categoryWithSubcategories = await Promise.all(
        categories.map(async (category) => {
          try {
            const subcategoriesResponse = await fetch(
              `https://khedu5yl4a.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}`
            );
            if (!subcategoriesResponse.ok) {
              throw new Error(
                `HTTP error! status: ${subcategoriesResponse.status}`
              );
            }
            const subcategories = await subcategoriesResponse.json();
            return { category, subcategories };
          } catch (error) {
            console.error(`Error fetching subcategories for ${category}:`, error);
            return { category, subcategories: [] };
          }
        })
      );

      setData(categoryWithSubcategories);

      const dataToSave = {
        data: categoryWithSubcategories,
        timestamp: Date.now(),
      };

      try {
        await AsyncStorage.setItem(
          'categoriesWithSubcategories',
          JSON.stringify(dataToSave)
        );
        console.log('Data saved to AsyncStorage');
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items'
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setCategories(jsonData);
      if (jsonData.length > 0) {
        setSelectedCategory(jsonData[0]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setExpandedSubCategories({});
    setExpandedArticles({});
  };

  const handleArticlePress = (article) => {
    setSelectedArticle(article);
    navigation.navigate('HTMLScreen', {
      article: article.title,
      id: article.id,
      type: article.type,
    });
  };

  const handleSubCategoryPress = async (subcategory, category) => {
    setSelectedCategory(category);
    setExpandedSubCategories((prevState) => ({
      ...prevState,
      [subcategory]: !prevState[subcategory],
    }));

    if (!expandedSubCategories[subcategory]) {
      try {
        const response = await fetch(
          `https://4uvh5c5t2g.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}&parent=${subcategory}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const articlesData = await response.json();
        setArticles((prevState) => ({
          ...prevState,
          [subcategory]: articlesData,
        }));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
  };

  const renderCategoryTabs = () => {
    if (!Array.isArray(categories)) {
      return <Text style={styles.content}>No data available</Text>;
    }

    return categories.map((category, index) => (
      <TouchableOpacity key={index} onPress={() => handleCategoryPress(category)}>
        <View style={styles.item}>
          <Text
            style={[
              styles.content,
              category === selectedCategory ? styles.selectedContent : null,
            ]}
          >
            {category || 'null'}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderSelectedCategoryAndSubcategories = () => {
    if (isLoading) {
      return <Text style={styles.content}>Loading...</Text>;
    }
    if (!Array.isArray(data) || data.length === 0) {
      return <Text style={styles.content}>No data available</Text>;
    }

    const selectedData = data.find((item) => item.category === selectedCategory);
    if (!selectedData) {
      return <Text style={styles.content}>No subcategories available</Text>;
    }

    return (
      <View key={selectedData.category}>
        <TouchableOpacity onPress={() => handleCategoryPress(selectedData.category)}>
          <View style={styles.categoryItem}>
            <Text style={[styles.categoryText, styles.selectedCategoryText]}>
              {selectedData.category || 'null'}
            </Text>
          </View>
        </TouchableOpacity>
        {selectedData.subcategories.length > 0 && (
          <View style={styles.subcategoryContainer}>
            {selectedData.subcategories.map((subcategory, subIndex) => (
              <View key={subIndex}>
                <TouchableOpacity
                  onPress={() =>
                    handleSubCategoryPress(subcategory, selectedData.category)
                  }
                >
                  <View style={styles.subcategoryItem}>
                    <Text style={styles.subcategoryText}>{subcategory}</Text>
                    <Text style={styles.expandCollapseText}>
                      {expandedSubCategories[subcategory] ?    <TouchableOpacity style={{ marginRight: 15 }}>
              <Icon
                name="long-arrow-up"
                size={18}
                color="#333333"
                onPress={() => {
                  navigation.navigate('Home');
                }}
              />
            </TouchableOpacity> :    <TouchableOpacity style={{ marginRight: 15 }}>
              <Icon
                name="long-arrow-down"
                size={18}
                color="#333333"
                onPress={() => {
                  navigation.navigate('Home');
                }}
              />
            </TouchableOpacity>}
                    </Text>
                  </View>
                </TouchableOpacity>
                {expandedSubCategories[subcategory] && renderArticles(subcategory)}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderArticles = (subcategory) => {
    const subcategoryArticles = articles[subcategory] || [];

    if (!Array.isArray(subcategoryArticles) || subcategoryArticles.length === 0) {
      return <Text style={styles.content}></Text>;
    }

    return subcategoryArticles.map((article, index) => (
      <TouchableOpacity key={index} onPress={() => handleArticlePress(article)}>
        <View style={styles.articleItem}>
          <Text style={styles.articleText}>{article.title}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.main}>
      <View style={styles.navbar}>
        <ScrollView vertical showsVerticalScrollIndicator={true}>
          <View style={styles.Navbarcontainer}>{renderCategoryTabs()}</View>
        </ScrollView>
      </View>
      <View>
        <ScrollView>
          <View style={styles.listcontainer}>{renderSelectedCategoryAndSubcategories()}</View>
        </ScrollView>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F0F0F0', 
    padding: 10,
  },
  Navbarcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  listcontainer: {
    marginTop: 30,
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 10,
    flexDirection: 'column',
    borderColor: '#CCCCCC', 
    borderWidth: 1,
    borderRadius: 10,
    elevation:10,
    shadowOpacity:"#333333"
  },
  categoryItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC', 
  },
  categoryText: {
    fontSize: 18,
    color: 'black', 
    textAlign: 'left',
    borderRadius: 15,
  },
  selectedCategoryText: {
    color: '#007AFF', 
    fontWeight: 'bold',
  },
  subcategoryContainer: {
    paddingLeft: 20,
  },
  subcategoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subcategoryText: {
    fontSize: 16,
    color: 'black', 
    letterSpacing: 1,
  },
  ArticleText: {
    fontSize: 16,
    color: 'black',
    letterSpacing: 1,
  },
  expandCollapseText: {
    fontSize: 16,
    color: '#666666', 
    marginLeft: 5,
  },
  content: {
    fontSize: 16,
    color: 'black', 
    textAlign: 'center',
    flexDirection: 'row',
    letterSpacing: 1,
  },
  TextHeading: {
    color: '#007AFF',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'helvetica', 
  },
  item: {
    backgroundColor: '#FFFFFF', 
    padding: 10,
    margin: 7,
    borderRadius: 10,
    borderColor: '#CCCCCC', 
    fontFamily: 'helvetica', 
    borderWidth: 1,
    flexDirection: 'row',
  },
  selectedContent: {
    color: '#007AFF', 
    fontWeight: 'bold',
  },
  articleItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC', 
  },
  articleText: {
    fontSize: 18,
    color: 'black', 
    paddingLeft: 20,
  },
  articleContent: {
    fontSize: 14,
    color: 'black',
  },
});



