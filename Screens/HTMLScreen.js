


import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CategoryContext, SubCategoryContext } from '../components/Context/BreadcrumbContext';


const HTMLScreen = ({ route }) => {
  const { article, id } = route.params;
  const [htmlContent, setHtmlContent] = useState(null);
  const [docUrl, setDocUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);

  const { setCategory } = useContext(CategoryContext);
  const { setSubcategory } = useContext(SubCategoryContext);


  useEffect(() => {
    setCategory(article);
    setSubcategory("");
    const loadCachedData = async () => {
      try {
        const cachedDataString = await AsyncStorage.getItem(`article_${id}`);
        if (cachedDataString) {
          const cachedData = JSON.parse(cachedDataString);
          setHtmlContent(cachedData.htmlContent);
          setDocUrl(cachedData.docUrl);
          setSelectedType(cachedData.selectedType);
          setIsLoading(false);
        } else {
          fetchAndSaveContent();
        }
      } catch (error) {
        console.error('Error loading cached data:', error);
      }
    };

    loadCachedData();
  }, [article, id]);

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

      const htmlWithStyles = `
        <html>
          <head>
            <style>
              body {
                font-size: 20px;
                line-height: 1.6;
              }
            </style>
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body>
            ${latestHtmlData}
          </body>
        </html>
      `;

      setHtmlContent(htmlWithStyles);
      setDocUrl(docItem?.docUrl);

      const selectedType = docItem && docItem.docUrl ? 'doc' : 'html';
      setSelectedType(selectedType);

      const dataToSave = {
        htmlContent: htmlWithStyles,
        docUrl: docItem?.docUrl,
        selectedType: selectedType,
      };

      await AsyncStorage.setItem(`article_${id}`, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error fetching content:', error);
      Alert.alert('Error', 'Failed to fetch content');
    } finally {
      setIsLoading(false);
    }
  };

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
    backgroundColor: '#007AFF',
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
    backgroundColor: '#007AFF',
    letterSpacing: 2,
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: '#FFFFFF',
  },
  line: {
    color: '#333333',
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  contentText: {
    color: '#333333',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  
  },
});

export default HTMLScreen;
