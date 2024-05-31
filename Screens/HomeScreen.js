

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// export default function HomeScreen() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchCategories();
//     fetchCategoriesWithSubcategories();
//   }, []);



//   const handleSubCategoryPress = (subcategory,category) => {
//     setSelectedSubCategory(subcategory);
//     setSelectedCategory(category)
//     navigation.navigate('ArticleScreen', { category: category, subcategory: subcategory });
//   };


//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(
//         'https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items',
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const jsonData = await response.json();
//       setCategories(jsonData);
//       if (jsonData.length > 0) {
//         setSelectedCategory(jsonData[0]); // Set the first category as selected by default
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const fetchCategoriesWithSubcategories = async () => {
//     try {
//       const response = await fetch(
//         'https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items',
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const categories = await response.json();

//       const categoryWithSubcategories = await Promise.all(
//         categories.map(async category => {
//           try {
//             const subcategoriesResponse = await fetch(
//               `https://khedu5yl4a.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}`,
//             );
//             if (!subcategoriesResponse.ok) {
//               throw new Error(
//                 `HTTP error! status: ${subcategoriesResponse.status}`,
//               );
//             }
//             const subcategories = await subcategoriesResponse.json();
//             return {category, subcategories};
//           } catch (error) {
//             console.error(
//               `Error fetching subcategories for ${category}:`,
//               error,
//             );
//             return {category, subcategories: []}; // Return empty subcategories on error
//           }
//         }),
//       );

//       setData(categoryWithSubcategories);
//       setIsLoading(false); // Set loading to false after data is fetched
//     } catch (error) {
//       console.error('Error fetching categories and subcategories:', error);
//       setIsLoading(false); // Set loading to false even if there's an error
//     }
//   };

//   const handleCategoryPress = category => {
//     setSelectedCategory(category);
//     navigation.navigate('SubCategories', {category: category});
//   };

//   const renderCategoryTabs = () => {
//     if (!Array.isArray(categories)) {
//       return <Text style={styles.content}>No data available</Text>;
//     }


//     return categories.map((category, index) => (
//       <TouchableOpacity
//         key={index}
//         onPress={() => handleCategoryPress(category)}>
//         <View style={styles.item}>
//           <Text
//             style={[
//               styles.content,
//               category === selectedCategory ? styles.selectedContent : null,
//             ]}>
//             {category || 'null'}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     ));
//   };

//   const renderCategoriesAndSubcategories = () => {
//     if (isLoading) {
//       return <Text style={styles.content}>Loading...</Text>;
//     }
//     if (!Array.isArray(data) || data.length === 0) {
//       return <Text style={styles.content}>No data available</Text>;
//     }
//     return data.map((item, index) => (
//       <View style={styles.border}>
//         <View key={index}>
//           <Text style={styles.categoryText}>{item.category}</Text>
//           {item.subcategories.length > 0 ? (
//             item.subcategories.map((subcategory, subIndex) => (
//               <View key={subIndex} style={styles.subcategoryItem}>
//               <TouchableOpacity onPress={() => handleSubCategoryPress(subcategory)}>
//                 <Text style={styles.subcategoryText}>{subcategory}  </Text>

//               </TouchableOpacity>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noSubcategoryText}>
//               No subcategories available
//             </Text>
//           )}
//         </View>
//       </View>
//     ));
//   };


//   // Load data from AsyncStorage on component mount
//   useEffect(() => {
//     const loadCachedData = async () => {
//       try {
//         const cachedDataString = await AsyncStorage.getItem('categoriesWithSubcategories');
//         if (cachedDataString) {
//           const cachedData = JSON.parse(cachedDataString);
//           const isFresh = isDataFresh(cachedData.timestamp); // Implement isDataFresh function to check for data freshness

//           if (isFresh) {
//             setData(cachedData.data);
//             setIsLoading(false); // Set loading to false after cached data is loaded
//           } else {
//             console.log('Cached data is not fresh, fetching new data');
//             fetchData(); // Proceed with fetching new data if it's not fresh
//           }
//         }
//       } catch (error) {
//         console.error('Error loading cached data:', error);
//       }
//     };

//     loadCachedData();
//   }, []);


//   // Fetch data from API and store in AsyncStorage
//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const categories = await response.json();

//       const categoryWithSubcategories = await Promise.all(
//         categories.map(async category => {
//           // ... existing logic to fetch subcategories ...
//         })
//       );

//       setData(categoryWithSubcategories);
//       setIsLoading(false); // Set loading to false after data is fetched

//       const dataToSave = {
//         data: categoryWithSubcategories,
//         timestamp: Date.now(), // Record the timestamp when data is stored
//       };

//       try {
//         await AsyncStorage.setItem('categoriesWithSubcategories', JSON.stringify(dataToSave));
//         console.log('Data saved to AsyncStorage');
//       } catch (error) {
//         console.error('Error saving data to AsyncStorage:', error);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setIsLoading(false); // Set loading to false even if there's an error
//     }
//   };

//   // Implement isDataFresh function (optional)
//   const isDataFresh = (cachedDataTimestamp) => {
//     // Define your logic to determine freshness based on a time threshold or other criteria
//     const freshnessThresholdInMs = 1000 * 60 * 60; // Example: 1 hour
//     const currentTime = Date.now();
//     return (currentTime - cachedDataTimestamp) < freshnessThresholdInMs;
//   };




//   return (
//     <View style={styles.main}>
//       <View style={styles.container}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={true}>
//           <View style={styles.container}>{renderCategoryTabs()}</View>
//         </ScrollView>
//       </View>

//       <View style={styles.Subcontainer}>
//         <ScrollView showsVerticalScrollIndicator={true}>
//           <View>{renderCategoriesAndSubcategories()}</View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// }





import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    fetchCategoriesWithSubcategories();
  }, []);

  const loadCachedData = async () => {
    try {
      const cachedDataString = await AsyncStorage.getItem('categoriesWithSubcategories');
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
      const response = await fetch('https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const categories = await response.json();

      const categoryWithSubcategories = await Promise.all(
        categories.map(async category => {
          try {
            const subcategoriesResponse = await fetch(
              `https://khedu5yl4a.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}`
            );
            if (!subcategoriesResponse.ok) {
              throw new Error(`HTTP error! status: ${subcategoriesResponse.status}`);
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
      setIsLoading(false);

      const dataToSave = {
        data: categoryWithSubcategories,
        timestamp: Date.now(),
      };

      try {
        await AsyncStorage.setItem('categoriesWithSubcategories', JSON.stringify(dataToSave));
        console.log('Data saved to AsyncStorage');
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items');
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

  const fetchCategoriesWithSubcategories = async () => {
    try {
      const response = await fetch('https://tujwiopckf.execute-api.us-east-1.amazonaws.com/dev/items');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const categories = await response.json();

      const categoryWithSubcategories = await Promise.all(
        categories.map(async category => {
          try {
            const subcategoriesResponse = await fetch(
              `https://khedu5yl4a.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}`
            );
            if (!subcategoriesResponse.ok) {
              throw new Error(`HTTP error! status: ${subcategoriesResponse.status}`);
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
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories and subcategories:', error);
      setIsLoading(false);
    }
  };

  const isDataFresh = (cachedDataTimestamp) => {
    const freshnessThresholdInMs = 1000 * 60 * 60; // Example: 1 hour
    const currentTime = Date.now();
    return (currentTime - cachedDataTimestamp) < freshnessThresholdInMs;
  };

  const handleSubCategoryPress = (subcategory, category) => {
    setSelectedSubCategory(subcategory);
    setSelectedCategory(category);
    navigation.navigate('ArticleScreen', { category, subcategory });
  };

  const handleCategoryPress = category => {
    setSelectedCategory(category);
    navigation.navigate('SubCategories', { category });
  };

  const renderCategoryTabs = () => {
    if (!Array.isArray(categories)) {
      return <Text style={styles.content}>No data available</Text>;
    }

    return categories.map((category, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleCategoryPress(category)}
      >
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

  const renderCategoriesAndSubcategories = () => {
    if (isLoading) {
      return <Text style={styles.content}>Loading...</Text>;
    }
    if (!Array.isArray(data) || data.length === 0) {
      return <Text style={styles.content}>No data available</Text>;
    }
    return data.map((item, index) => (
      <View key={index} style={styles.border}>
      
        <Text style={styles.categoryText}>{item.category}</Text>
        {item.subcategories.length > 0 ? (
          item.subcategories.map((subcategory, subIndex) => (
            <View key={subIndex} style={styles.subcategoryItem}>
           
              <TouchableOpacity onPress={() => handleSubCategoryPress(subcategory, item.category)}>
                <Text style={styles.subcategoryText}>{subcategory}</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noSubcategoryText}>
            No subcategories available
          </Text>
        )}
      </View>
    ));
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={styles.container}>{renderCategoryTabs()}</View>
        </ScrollView>
      </View>

      <View style={styles.Subcontainer}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View>{renderCategoriesAndSubcategories()}</View>
        </ScrollView>
      </View>
    </View>
  );
}





const styles = StyleSheet.create({
  main: {
    // paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#00001C',
    
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'flex-start',
    marginBottom: 20,
    // marginTop:10,
    backgroundColor: '#1a1a2e',
    fontSize:24,
    fontFamily:"helvetica",
  },
  subcontainer: {
    // flexDirection: 'column',
    alignItems: "",
    //  marginTop:30
    backgroundColor: 'green',
    padding: 10,
  },
  main2: {
    margin: 20,
    marginTop: 30,
    backgroundColor: 'yellow',
  },
  item: {
    paddingStart: 5,
    padding: 5,
    
    // paddingEnd: 5,
    // marginRight: 15,
     margin: 3,
    borderRadius: 5,
    borderColor:"red",
    // backgroundColor:"red"
    margin:0
  },
  content: {
    fontSize: 16,
    letterSpacing:1.5,
    color: 'white',
    paddingTop:15,
    marginLeft:10,
    marginRight:10,
    alignItems:"center",
    fontWeight:"bold"
  
  },
  selectedContent: {
    color:'rgb(239, 50, 33)',
    borderBottomWidth:1,
    borderBottomColor: 'white',
    
  },
  categoryContainer: {
    marginBottom: 30,
    marginTop: 10,
    flexDirection: 'column',
    marginTop: 30,
  },
  categoryText: {
    fontSize: 18,
    color:  'rgb(239, 50, 33)',
    marginBottom: 10,
    paddingStart:3,
    textAlign:"center"
  },
  subcategoryItem: {
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#1a1a2e',
    borderRadius: 5,
    textAlign: 'center',
    justifyContent:"center",
    alignItems: "center",
    
  },
  subcategoryText: {
    padding:3,
    fontSize: 16,
    color: 'black',
    borderRadius:10,
    backgroundColor:"white",
    width:"auto",
    padding:5,
    elevation:10,
 
    shadowColor: 'white'
  },
  noSubcategoryText: {
    fontSize: 16,
    color: 'grey',
    
  },
  border: {
    borderColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 5,
    marginLeft:20,
    marginRight:20,
    padding:10,
    elevation:10,
 
    shadowColor: 'white',
    backgroundColor: '#1a1a2e',
    width:"auto"

  },
 
});
