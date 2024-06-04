
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadCachedData();
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, []);

  const loadCachedData = async () => {
    try {
      const cachedDataString = await AsyncStorage.getItem(
        'categoriesWithSubcategories',
      );
      if (cachedDataString) {
        const cachedData = JSON.parse(cachedDataString);
        const isFresh = isDataFresh(cachedData.timestamp);

        if (isFresh) {
          setData(cachedData.data);
          setIsLoading(false);
        } else {
          console.log('Cached data is not fresh, fetching new data');
          fetchData();
        }
      }
    } catch (error) {
      console.error('Error loading cached data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items',
      );
      console.log('response: ', response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const categories = await response.json();

      const categoryWithSubcategories = await Promise.all(
        categories.map(async category => {
          try {
            const subcategoriesResponse = await fetch(
              `https://khedu5yl4a.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}`,
            );
            if (!subcategoriesResponse.ok) {
              throw new Error(
                `HTTP error! status: ${subcategoriesResponse.status}`,
              );
            }
            const subcategories = await subcategoriesResponse.json();
            return {category, subcategories};
          } catch (error) {
            console.error(
              `Error fetching subcategories for ${category}:`,
              error,
            );
            return {category, subcategories: []};
          }
        }),
      );

      setData(categoryWithSubcategories);
      setIsLoading(false);

      const dataToSave = {
        data: categoryWithSubcategories,
        timestamp: Date.now(),
      };

      try {
        await AsyncStorage.setItem(
          'categoriesWithSubcategories',
          JSON.stringify(dataToSave),
        );
        console.log('Data saved to AsyncStorage');
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };
  const handlelistCategoryPress = category => {
    setSelectedCategory(category);
    const selectedData = data.find(item => item.category === category);
    if (selectedData) {
      setSelectedSubCategory(null); // Clear selected subcategory
      setData(prevData =>
        prevData.map(
          item =>
            item.category === category
              ? {...item, selected: true} // Add selected flag to the selected category
              : {...item, selected: false}, // Remove selected flag from other categories
        ),
      );
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items',
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

  const isDataFresh = cachedDataTimestamp => {
    const freshnessThresholdInMs = 1000 * 60 * 60; // Example: 1 hour
    const currentTime = Date.now();
    return currentTime - cachedDataTimestamp < freshnessThresholdInMs;
  };

  const handleCategoryPress = category => {
    setSelectedCategory(category);
    navigation.navigate('SubCategories', {category});
  };

  const handleSubCategoryPress = (subcategory, category) => {
    setSelectedSubCategory(subcategory);
    setSelectedCategory(category);
    navigation.navigate('ArticleScreen', {category, subcategory});
  };

  const renderCategoryTabs = () => {
    if (!Array.isArray(categories)) {
      return <Text style={styles.content}>No data available</Text>;
    }

    return categories.map((category, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleCategoryPress(category)}>
        <View style={styles.item}>
          <Text
            style={[
              styles.content,
              category === selectedCategory ? styles.selectedContent : null,
            ]}>
            {category || 'null'}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderCategoriesAndSubcategories = () => {
    if (isLoading) {
      return <Text style={styles.content}>Loading...</Text>;
    }
    if (!Array.isArray(data) || data.length === 0) {
      return <Text style={styles.content}>No data available</Text>;
    }

    return data.map((item, index) => (
      <View key={index}>
        <TouchableOpacity
          onPress={() => handlelistCategoryPress(item.category)}>
          <View style={styles.categoryItem}>
            <Text
              style={[
                styles.categoryText,
                item.category === selectedCategory
                  ? styles.selectedCategoryText
                  : null,
              ]}>
              {item.category || 'null'}
            </Text>
          </View>
        </TouchableOpacity>
        {item.category === selectedCategory &&
          item.subcategories.length > 0 && (
            <View style={styles.subcategoryContainer}>
              {item.subcategories.map((subcategory, subIndex) => (
                <TouchableOpacity
                  key={subIndex}
                  onPress={() =>
                    handleSubCategoryPress(subcategory, item.category)
                  }>
                  <View style={styles.subcategoryItem}>
                    <Text style={styles.subcategoryText}>{subcategory}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
      </View>
    ));
  };

  return (
    <View style={styles.main}>
      <View style={styles.navbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={styles.Navbarcontainer}>{renderCategoryTabs()}</View>
        </ScrollView>
      </View>
      <View>
        <Text style={styles.TextHeading}>Tech</Text>
        <ScrollView>
          <View style={styles.listcontainer}>
            {renderCategoriesAndSubcategories()}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#00001C',
    padding: 20,
  },
  navbar: {
    backgroundColor: '#1a1a2e',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  Navbarcontainer: {
   
    backgroundColor: '#1a1a2e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    marginBottom: 20,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  categoryItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  categoryText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
  },
  selectedCategoryText: {
    color: 'rgb(239, 50, 33)',
    fontWeight: 'bold',
  },
  subcategoryContainer: {
    paddingLeft: 20,
    backgroundColor: '#1a1a2e',
  },
  subcategoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  subcategoryText: {
    fontSize: 16,
    color: 'white',
  },
  content: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  TextHeading: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    margin: 20,
    fontWeight: 'bold',
  },
  item: {
    padding: 5,
    marginRight: 5,
  },
  selectedContent: {
    color: 'rgb(239, 50, 33)',
    fontWeight: 'bold',
  },
});
