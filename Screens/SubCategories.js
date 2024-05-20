// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';

// export default function SubcategoriesScreen() {
//   console.log("inside subcategories");
//   const navigation = useNavigation();
//   const route = useRoute();

//   const { category } = route.params;

//   const handleSubCategoryPress = (subcategory) => {
//     navigation.navigate("ArticleScreen", { subcategory });
//   };

//   return (
//     <View style={styles.main}>
//       <View style={{  flexDirection: 'row',
//     padding: 10,
//     paddingRight:0,
//     paddingBottom:20,
//     flex:0,
//    }}>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>

//         {category.subcategories.map((subcategory) => (
//           <TouchableOpacity
//             key={subcategory.subcategoryId}
//             onPress={() => handleSubCategoryPress(subcategory)}
//             style={styles.contentcontainer}
//           >
//           <View>
          
//             <Text style={styles.content}>{subcategory.subcategory}</Text>
          
//           </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       </View>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   main: {
//     padding:10,
//     flex:1,
//     backgroundColor: "#00001C"
//   },
 
 
//   content: {
  
//     color: "#FF4500",
//     fontSize: 16,
//     borderWidth: 1,
//     fontWeight: "600",
//     backgroundColor: "white",
//     borderColor: "grey",
//     padding: 10,
//     borderRadius: 5,
//     margin:10,
//     marginTop: 5,
//   },


// });




// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function SubCategories({ route }) {
//   const { category } = route.params;
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);


//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       try {
//         const response = await fetch(`https://khedu5yl4a.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}`);
//         const jsonData = await response.json();
//         setSubcategories(jsonData);
//       } catch (error) {
//         console.error('Error fetching subcategories:', error);
//       }
//     };

//     const handleSubCategoryPress=(item)=>{
//       setSelectedSubCategory(item);
//       navigation.navigate('ArticleScreen', { item: item });
//     }

//     fetchSubcategories();
//   }, [category]);

//   // Display the subcategories
//   if (!Array.isArray(subcategories) || subcategories.length === 0) {
//     return <Text style={styles.content}>No subcategories available</Text>;
//   }

//   return (
  
//  <View style={styles.main}>
//       <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      
       
//       {subcategories.map((subcategory, index) => (
//         <TouchableOpacity key={index} onPress={() => handleSubCategoryPress(item)}> 
//          <View style={styles.item}>
//         <Text style={styles.content} key={index}>{subcategory}</Text>
//         </View>
//         </TouchableOpacity>
//       ))}
    
       
//       </ScrollView>
//     </View>
//   );
// }




// const styles = StyleSheet.create({
//   main: {
//     padding: 10,
//     flex: 1,
//     backgroundColor: '#00001C',
//   },
//   container: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginTop: 5,
//   },
//   item: {
//     backgroundColor: 'white',
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//   },
//   content: {
//     fontSize: 16,
//     color: '#FF4500',
//   },
// });










import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SubCategories({ route }) {
  const { category } = route.params;
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`https://khedu5yl4a.execute-api.us-east-1.amazonaws.com/dev/items?tech=${category}`);
        const jsonData = await response.json();
        setSubcategories(jsonData);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [category]);

  const handleSubCategoryPress = (subcategory) => {
    setSelectedSubCategory(subcategory);
    navigation.navigate('ArticleScreen', { category: category, subcategory: subcategory });
  };

  // Display the subcategories
  if (!Array.isArray(subcategories) || subcategories.length === 0) {
    return <Text style={styles.content}>No subcategories available</Text>;
  }

  return (
    <View style={styles.main}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
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
