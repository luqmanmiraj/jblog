

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as RNFS from 'react-native-fs';

const HTMLScreen = ({ route }) => {
  const { article, id } = route.params;
  const [htmlContent, setHtmlContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [docUrl, setDocUrl] = useState("");

  useEffect(() => {
    const fetchAndSaveHtmlContent = async () => {
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

        const latestData = jsonData.map(item => item.html).join('\n');
        const lastUpdated = new Date().getTime();  // Using current timestamp for simplicity

        const fileName = `${filePrefix}_${lastUpdated}.html`;
        const metaFileName = `${filePrefix}_meta.json`;
        const htmlFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        const metaFilePath = `${RNFS.DocumentDirectoryPath}/${metaFileName}`;

        // Check if the metadata file exists
        const metaExists = await RNFS.exists(metaFilePath);
        let shouldUpdate = true;

        if (metaExists) {
          // Read the metadata file
          const metaContent = await RNFS.readFile(metaFilePath, 'utf8');
          const meta = JSON.parse(metaContent);

          // Compare timestamps
          if (meta.lastUpdated >= lastUpdated) {
            const existingFiles = await RNFS.readDir(RNFS.DocumentDirectoryPath);
            const latestFile = existingFiles.find(file => file.name === meta.latestFileName);
            if (latestFile) {
              const fileContent = await RNFS.readFile(latestFile.path, 'utf8');
              setHtmlContent(fileContent);
              shouldUpdate = false;
            }
          }
        }

        if (shouldUpdate) {
          // Write the new HTML content to the file
          await RNFS.writeFile(htmlFilePath, latestData, 'utf8');

          // Update the metadata file
          const meta = { lastUpdated, latestFileName: fileName };
          await RNFS.writeFile(metaFilePath, JSON.stringify(meta), 'utf8');

          setHtmlContent(latestData);
        }

        // Set docUrl after jsonData is fetched
        const docItem = jsonData.find(item => item.type === 'doc');
        setDocUrl(docItem?.docUrl);

      } catch (error) {
        console.error('Error fetching or reading HTML file:', error);
        Alert.alert('Error', 'Failed to fetch or read HTML file');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSaveHtmlContent();
  }, [article, id]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {htmlContent ? (
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={styles.webview}
        />
      ) : (
        <Text>No content available</Text>
      )}
      {docUrl ? (
        <WebView
          originWhitelist={['*']}
          source={{ uri: docUrl }}
          style={styles.webview}
        />
      ) : (
        <Text>No document URL available</Text>
      )}
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
});

export default HTMLScreen;
