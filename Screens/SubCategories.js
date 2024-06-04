

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SubCategories({ route }) {
  const { category } = route.params;
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCachedData = async () => {
      try {
        const cachedDataString = await AsyncStorage.getItem(`subcategories_${category}`);
        if (cachedDataString) {
          const cachedData = JSON.parse(cachedDataString);
          const isFresh = isDataFresh(cachedData.timestamp);

          if (isFresh) {
            setSubcategories(cachedData.data);
          } else {
            console.log('Cached data is not fresh, fetching new data');
            fetchSubcategories();
          }
        } else {
          fetchSubcategories();
        }
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
    }
  };

  const isDataFresh = (cachedDataTimestamp) => {
    const freshnessThresholdInMs = 1000 * 60 * 60; // Example: 1 hour
    const currentTime = Date.now();
    return (currentTime - cachedDataTimestamp) < freshnessThresholdInMs;
  };

  const handleSubCategoryPress = (subcategory) => {
    setSelectedSubCategory(subcategory);
    navigation.navigate('ArticleScreen', { category: category, subcategory: subcategory });
  };

  if (!Array.isArray(subcategories) || subcategories.length === 0) {
    return <Text style={styles.content}>No subcategories available</Text>;
  }

  return (
    <View style={styles.main}>
      <Text style={styles.TextHeading}>Chapters</Text>
      <Text style={styles.header}>{category}</Text>
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
    color:"white",
    fontSize:26,
    textAlign: 'center',
    margin:10,
    fontWeight: 'bold',
      },
});
