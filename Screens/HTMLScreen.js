

// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
// import { WebView } from 'react-native-webview';
// import * as RNFS from 'react-native-fs';

// const HTMLScreen = ({ route }) => {
//   const { article, id } = route.params;
//   const [htmlContent, setHtmlContent] = useState(null);
//   const [docUrl, setDocUrl] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedType, setSelectedType] = useState(null); // Default type is null

//   useEffect(() => {
//     const fetchAndSaveContent = async () => {
//       try {
//         const filePrefix = `${article}_${id}`;
//         const response = await fetch(
//           `https://uzvp6pj46k.execute-api.us-east-1.amazonaws.com/dev/items?title=${article}&id=${id}`
//         );

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
//         }

//         const jsonData = await response.json();
//         console.log("json data:", jsonData);

//         const latestHtmlData = jsonData.map(item => item.html).join('\n');
//         const docItem = jsonData.find(item => item.type === 'doc'); // Assuming 'doc' type for document URL

//         setHtmlContent(latestHtmlData);
//         setDocUrl(docItem?.docUrl); // Set docUrl only if present

//         // Determine and set the type based on the fetched data
//         if (docItem && docItem.docUrl) {
//           setSelectedType('doc');
//         } else if (latestHtmlData) {
//           setSelectedType('html');
//         }
//       } catch (error) {
//         console.error('Error fetching content:', error);
//         Alert.alert('Error', 'Failed to fetch content');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAndSaveContent();
//   }, [article, id]);

//   const handleTypeChange = (type) => {
//     setSelectedType(type);
//   };

//   const renderContent = () => {
//     if (isLoading) {
//       return (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" />
//         </View>
//       );
//     }

//     if (selectedType === 'html' && htmlContent) {
//       return (
//         <WebView
//           originWhitelist={['*']}
//           source={{ html: htmlContent }}
//           style={styles.webview}
//         />
//       );
//     } else if (selectedType === 'doc' && docUrl) {
//       return (
//         <WebView
//           originWhitelist={['*']}
//           source={{ uri: docUrl }}
//           style={styles.webview}
//         />
//       );
//     } else {
//       return <Text>No content available for selected type</Text>;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.typeButtons}>
//         <TouchableOpacity
//           style={[styles.typeButton, selectedType === 'doc' && styles.activeButton]}
//           onPress={() => handleTypeChange('doc')}
//         >
//           <Text style={styles.line}>Doc</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.typeButton, selectedType === 'html' && styles.activeButton]}
//           onPress={() => handleTypeChange('html')}
//         >
//           <Text style={styles.line}>HTML</Text>
//         </TouchableOpacity>
//       </View>
//       {renderContent()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#00001C'
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   webview: {
//     flex: 1,
//   },
//   typeButtons: {
//     marginTop:8,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
    
//   },
//   typeButton: {
  
//    textAlign:"center",
//     backgroundColor: '#00001C'
//   },
//   activeButton: {
//     Color:"#FF4500",
//     fontSize:24,
//     borderBottomColor:"#FF4500",
//     textDecorationLine: 'underline',
//     textDecorationColor: '#FF4500', // Ensure the underline color is set correctly
//   },
//   line:{
//     color:"white",
    
//   }
// });

// export default HTMLScreen;



import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const HTMLScreen = ({ route }) => {
  const { article, id } = route.params;
  const [htmlContent, setHtmlContent] = useState(null);
  const [docUrl, setDocUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const fetchAndSaveContent = async () => {
      try {
        const response = await fetch(
          `https://uzvp6pj46k.execute-api.us-east-1.amazonaws.com/dev/items?title=${article}&id=${id}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
        }

        const jsonData = await response.json();
        const latestHtmlData = jsonData.map(item => item.html).join('\n');
        const docItem = jsonData.find(item => item.type === 'doc');

        setHtmlContent(latestHtmlData);
        setDocUrl(docItem?.docUrl);

        if (docItem && docItem.docUrl) {
          setSelectedType('doc');
        } else if (latestHtmlData) {
          setSelectedType('html');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        Alert.alert('Error', 'Failed to fetch content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSaveContent();
  }, [article, id]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (selectedType === 'html' && htmlContent) {
      return (
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={styles.webview}
        />
      );
    } else if (selectedType === 'doc' && docUrl) {
      return (
        <WebView
          originWhitelist={['*']}
          source={{ uri: docUrl }}
          style={styles.webview}
        />
      );
    } else {
      return <Text style={styles.contentText}>No content available for selected type</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.typeButtons}>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => handleTypeChange('doc')}
        >
          <Text
            style={[
              styles.line,
              selectedType === 'doc' && styles.activeText
            ]}
          >
            Doc
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => handleTypeChange('html')}
        >
          <Text
            style={[
              styles.line,
              selectedType === 'html' && styles.activeText
            ]}
          >
            HTML
          </Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00001C'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
  },
  typeButtons: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  typeButton: {
    textAlign: 'center',
    backgroundColor: '#00001C'
  },
  activeText: {
    color: '#FF4500',
    textDecorationLine: 'underline',
    textDecorationColor: '#FF4500',
  },
  line: {
    color: 'white',
    fontSize: 18,
  },
  contentText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default HTMLScreen;
