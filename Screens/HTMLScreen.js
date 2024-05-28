

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as RNFS from 'react-native-fs';

const HTMLScreen = ({ route }) => {
  const { article, id } = route.params;
  const [htmlContent, setHtmlContent] = useState(null);
  const [docUrl, setDocUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null); // Default type is null

  useEffect(() => {
    const fetchAndSaveContent = async () => {
      try {
        const filePrefix = `${article}_${id}`;
        const response = await fetch(
          `https://uzvp6pj46k.execute-api.us-east-1.amazonaws.com/dev/items?title=${article}&id=${id}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
        }

        const jsonData = await response.json();
        console.log("json data:", jsonData);

        const latestHtmlData = jsonData.map(item => item.html).join('\n');
        const docItem = jsonData.find(item => item.type === 'doc'); // Assuming 'doc' type for document URL

        setHtmlContent(latestHtmlData);
        setDocUrl(docItem?.docUrl); // Set docUrl only if present

        // Determine and set the type based on the fetched data
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
      return <Text>No content available for selected type</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.typeButtons}>
        <TouchableOpacity
          style={[styles.typeButton, selectedType === 'doc' && styles.activeButton]}
          onPress={() => handleTypeChange('doc')}
        >
          <Text>Doc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, selectedType === 'html' && styles.activeButton]}
          onPress={() => handleTypeChange('html')}
        >
          <Text>HTML</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  typeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  activeButton: {
    backgroundColor: '#ccc',
  },
});

export default HTMLScreen;
