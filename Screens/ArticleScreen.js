

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CategoryContext, SubCategoryContext } from '../components/Context/BreadcrumbContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ArticleScreen({ route }) {
  const { category, subcategory } = route.params;
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setCategory } = useContext(CategoryContext);
  const { setSubcategory } = useContext(SubCategoryContext);

  const navigation = useNavigation();

  const handleArticlePress = (article) => {
    navigation.navigate('HTMLScreen', { article: article.title, id: article.id, type: article.type });
  };

  useEffect(() => {
    setCategory(category);
    setSubcategory(subcategory);

    const loadCachedData = async () => {
      try {
        const cachedDataString = await AsyncStorage.getItem(`articles_${category}_${subcategory}`);
        if (cachedDataString) {
          const cachedData = JSON.parse(cachedDataString);
          if (Array.isArray(cachedData.data)) {
            setArticles(cachedData.data);
          }
        }
        fetchArticles(); 
      } catch (error) {
        console.error('Error loading cached data:', error);
      }
    };

    loadCachedData();
  }, [category, subcategory]);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `https://4uvh5c5t2g.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}&parent=${subcategory}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      if (Array.isArray(jsonData)) {
        setArticles(jsonData);
      } else {
        console.error('Fetched data is not an array:', jsonData);
      }

      const dataToSave = {
        data: jsonData,
        timestamp: Date.now(),
      };

      try {
        await AsyncStorage.setItem(`articles_${category}_${subcategory}`, JSON.stringify(dataToSave));
        console.log('Data saved to AsyncStorage');
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!Array.isArray(articles) || articles.length === 0) {
    return <Text style={styles.content}>No articles available</Text>;
  }

  return (
    <View style={styles.main}>
      <Text style={styles.TextHeading}>Articles</Text>
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
    backgroundColor: '#F0F0F0', 
  },
  scrollView: {
    flexGrow: 1,
  },
  loadingText: {
    fontSize: 20,
    color: 'black',
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10, 
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC', 
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
});






// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { CategoryContext, SubCategoryContext } from '../components/Context/BreadcrumbContext';

// export default function ArticleScreen({ route }) {

//   const { setCategory } = useContext(CategoryContext);
//   const { setSubcategory } = useContext(SubCategoryContext);

// const [selectedArticle, setSelectedArticle] = useState(null);
//   const { category, subcategory } = route.params;
//   const [articles, setArticles] = useState([]);
//   const navigation = useNavigation();
  
//   const handleArticlePress = (article) => {
//     setSelectedArticle(article)
//     navigation.navigate('HTMLScreen', { article: article.title, id: article.id, type: article.type });
//   };

//   useEffect(() => {
//     setCategory(category);
//     setSubcategory(subcategory);

//     const loadCachedData = async () => {
//       try {
//         const cachedDataString = await AsyncStorage.getItem(`articles_${category}_${subcategory}`);
//         if (cachedDataString) {
//           const cachedData = JSON.parse(cachedDataString);
//           setArticles(cachedData.data);
     
//         }
//         fetchArticles(); // Fetch fresh data in the background
//       } catch (error) {
//         console.error('Error loading cached data:', error);
//       }
//     };

//     loadCachedData();
    
//   }, [category, subcategory]);

//   const fetchArticles = async () => {
//     try {
//       const response = await fetch(
//         `https://4uvh5c5t2g.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}&parent=${subcategory}`,
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const jsonData = await response.json();
//       setArticles(jsonData);

//       const dataToSave = {
//         data: jsonData,
//         timestamp: Date.now(),
//       };

//       try {
//         await AsyncStorage.setItem(`articles_${category}_${subcategory}`, JSON.stringify(dataToSave));
//         console.log('Data saved to AsyncStorage');
//       } catch (error) {
//         console.error('Error saving data to AsyncStorage:', error);
//       }
//     } catch (error) {
//       console.error('Error fetching articles:', error);
//     }
//   };
//   console.log("articles:",articles);
//   return (
//     <View style={styles.main}>
  
//       <Text style={styles.TextHeading}>Articles</Text>
//       <ScrollView contentContainerStyle={styles.scrollView}>
  
//         {articles.map((article, index) => (
//           <TouchableOpacity key={index} onPress={() => handleArticlePress(article)}>
//             <View style={styles.item}>
//               <Text style={styles.content}>{article.title}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   main: {
//     padding: 20,
//     flex: 1,
//     backgroundColor: '#F0F0F0', // White background
//   },
//   scrollView: {
//     flexGrow: 1,
//   },
//   item: {
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 10, // Unified borderRadius
//     backgroundColor: '#FFFFFF',
//     borderColor: '#CCCCCC', // Light border color
//     borderWidth: 1,
//   },
//   content: {
//     fontSize: 16,
//     color: 'black', // Dark text color
//     fontFamily: 'Helvetica', // Helvetica font family
//   },
//   header: {
//     color: "#007AFF",
//     paddingVertical: 5,
//     fontWeight: "bold",
//     fontSize: 22,
//     fontFamily: 'Helvetica',
//   },
//   TextHeading: {
//     color: "#333333",
//     fontSize: 28,
//     textAlign: 'center',
//     margin: 10,
//     fontWeight: 'bold',
//     fontFamily: 'Helvetica',
//   },
// });
