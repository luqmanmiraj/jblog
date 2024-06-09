


import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { CategoryContext, SubCategoryContext } from '../components/Context/BreadcrumbContext';

export default function SubCategories({ route }) {
  const { setCategory } = useContext(CategoryContext);
  const { setSubcategory } = useContext(SubCategoryContext);

  const { category } = route.params;
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setCategory(category);
    setSubcategory("");
    const loadCachedData = async () => {
      try {
        const cachedDataString = await AsyncStorage.getItem(`subcategories_${category}`);
        if (cachedDataString) {
          const cachedData = JSON.parse(cachedDataString);
          setSubcategories(cachedData.data);
        }
        fetchSubcategories(); 
      } catch (error) {
        console.error('Error loading cached data:', error);
      }
    };

    loadCachedData();
  }, [category]);

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(`https://khedu5yl4a.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setSubcategories(jsonData);
      setIsLoading(false);

      const dataToSave = {
        data: jsonData,
        timestamp: Date.now(),
      };

      try {
        await AsyncStorage.setItem(`subcategories_${category}`, JSON.stringify(dataToSave));
        console.log('Data saved to AsyncStorage');
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setIsLoading(false);
    }
  };

  const handleSubCategoryPress = (subcategory) => {
    navigation.navigate('AppNavigation', { category: category, subcategory: subcategory });
    navigation.navigate('ArticleScreen', { category: category, subcategory: subcategory });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!Array.isArray(subcategories) || subcategories.length === 0) {
    return <Text style={styles.content}>No subcategories available</Text>;
  }

  return (
    <View style={styles.main}>
      <Text style={styles.TextHeading}>Chapters</Text>
 
      <ScrollView contentContainerStyle={styles.scrollView}>
        {subcategories.map((subcategory, index) => (
          <TouchableOpacity key={index} onPress={() => handleSubCategoryPress(subcategory)}>
            <View style={styles.item}>
              <Text style={styles.content}>{subcategory}</Text>
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
    backgroundColor: '#F0F0F0',
  },
  scrollView: {
    flexGrow: 1,
  },
  item: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderColor: "#CCCCCC",
    borderWidth: 1,
  },
  content: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Helvetica',
  },
  header: {
    color: "#007AFF",
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize: 22,
    fontFamily: 'Helvetica',
  },
  TextHeading: {
    color: "#333333",
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: 'black',
  },
});

