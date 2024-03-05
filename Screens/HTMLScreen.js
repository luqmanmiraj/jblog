

// import React from 'react';
// import { WebView} from 'react-native-webview';
// import {View, Text} from "react-native";

// const HTMLScreen = ({ route }) => {
//   const { article } = route.params;

//   // Generate HTML content based on the article ID
//   const generateHTMLContent = (articleId) => {
//     // Extracted dummy HTML content for demonstration
//     const dummyHTMLContent = {
//       1: '<div><h1>Tech Tehwar - Article 1</h1><h2>This is the content of Tehwar1.</h2></div>',
//       2: '<div><h1>Tech Tehwar - Article 2</h1><h2>This is the content of Tehwar2.</h2></div>',
//       3: '<div><h1>Techoloco - Article 1</h1><h2>This is the content of Techoloco1.</h2></div>',
//       4: '<div><h1>Techoloco - Article 2</h1><h2>This is the content of Techoloco2.</h2></div>',
//       5: '<div><h1>Redux - Article 1</h1><h2>This is the content of Redux1.</h2></div>',
//       6: '<div><h1>Redux - Article 2</h1><h2>This is the content of Redux2.</h2></div>',
//       7: '<div><h1>Context - Article 1</h1><h2>This is the content of Context1.</h2></div>',
//       8: '<div><h1>Context - Article 2</h1><h2>This is the content of Context2.</h2></div>',
//       9: '<div><h1>FullStack - Article 1</h1><h2>This is the content of FullStack1.</h2></div>',
//       10: '<div><h1>FullStack - Article 2</h1><h2>This is the content of FullStack2.</h2></div>',
//       11: '<div><h1>GitStack - Article 1</h1><h2>This is the content of GitStack1.</h2></div>',
//       12: '<div><h1>GitStack - Article 2</h1><h2>This is the content of GitStack2.</h2></div>',
//       13: '<div><h1>Sandwich - Article 1</h1><h2>This is the content of Sandwich1.</h2></div>',
//       14: '<div><h1>Sandwich - Article 2</h1><h2>This is the content of Sandwich2.</h2></div>',
//       15: '<div><h1>WrapUp - Article 1</h1><h2>This is the content of WrapUp1.</h2></div>',
//       16: '<div><h1>WrapUp - Article 2</h1><h2>This is the content of WrapUp2.</h2></div>',
//       17: '<div><h1>Variety - Article 1</h1><h2>This is the content of Variety1.</h2></div>',
//       18: '<div><h1>Variety - Article 2</h1><h2>This is the content of Variety2.</h2></div>',
//       19: '<div><h1>Colors - Article 1</h1><h2>This is the content of Colors1.</h2></div>',
//       20: '<div><h1>Colors - Article 2</h1><h2>This is the content of Colors2.</h2></div>',

//       // Add more cases as needed for each article ID
//     };

//     return dummyHTMLContent[articleId] || '<div><p>No content available for this article oh no.</p></div>';
//   };

//   const htmlContent = generateHTMLContent(article.articleId);

//   return (
//     <View style={{ flex: 1 }}>
//     {/* Use WebView to render HTML content */}
//     <WebView
//       originWhitelist={['*']}
//       source={{ html: htmlContent }}
//       style={{ flex: 1 }}
//     />
//   </View>
//   );
// };

// export default HTMLScreen;



import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as RNFS from 'react-native-fs';

import { HTMLData } from "../android/app/src/main/assets/HTMLData.html";

const HTMLScreen = ({ route }) => {
  const { article } = route.params;
  const [htmlContent, setHtmlContent] = useState(null);

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        // Construct the destination path in the document directory
        const destinationPath = RNFS.DocumentDirectoryPath + '/HTMLData.html';

        // Check if the file already exists in the document directory
        const fileExists = await RNFS.exists(destinationPath);

        // If the file doesn't exist, copy it from assets to the document directory
        if (!fileExists) {
          await RNFS.copyFileAssets('HTMLData.html', destinationPath);
        }

        // Read the content of the HTML file from the document directory
        const content = await RNFS.readFile(destinationPath, 'utf8');
        setHtmlContent(content);
      } catch (error) {
        console.error('Error reading or copying HTML file:', error);
      }
    };

    fetchHtmlContent();
  }, [article]);

  if (!htmlContent) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default HTMLScreen;
