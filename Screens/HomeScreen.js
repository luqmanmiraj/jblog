
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    navigation.navigate('SubCategories', { category: category });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items'
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderData = () => {
    if (!Array.isArray(data)) {
      return <Text style={styles.content}>No data available</Text>;
    }
    return data.map((item, index) => (
      <TouchableOpacity key={index} onPress={() => handleCategoryPress(item)}>
        <View style={styles.item}>
          <Text style={styles.content}>{item || 'null'}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.main}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={styles.container}>
          {renderData()}
        </View>
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
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
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
