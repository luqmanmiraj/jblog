

// import React from 'react';
// import { WebView} from 'react-native-webview';
// import {View, Text} from "react-native";

// const HTMLScreen = ({ route }) => {
//   const { article } = route.params;
//   const generateHTMLContent = (articleId) => {
  
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

//     };

//     return dummyHTMLContent[articleId] || '<div><p>No content available for this article oh no.</p></div>';
//   };

//   const htmlContent = generateHTMLContent(article.articleId);

//   return (
//     <View style={{ flex: 1 }}>
//     <WebView
//       originWhitelist={['*']}
//       source={{ html: htmlContent }}
//       style={{ flex: 1 }}
//     />
//   </View>
//   );
// };

// export default HTMLScreen;



// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';
// import * as RNFS from 'react-native-fs';

// import { HTMLData } from "../android/app/src/main/assets/HTMLData.html";

// const HTMLScreen = ({ route }) => {
//   const { article } = route.params;
//   const [htmlContent, setHtmlContent] = useState(null);

//   useEffect(() => {
//     const fetchHtmlContent = async () => {
//       try {
//         // Construct the destination path in the document directory
//         const destinationPath = RNFS.DocumentDirectoryPath + '/HTMLData.html';

//         // Check if the file already exists in the document directory
//         const fileExists = await RNFS.exists(destinationPath);

//         // If the file doesn't exist, copy it from assets to the document directory
//         if (!fileExists) {
//           await RNFS.copyFileAssets('HTMLData.html', destinationPath);
//         }

//         // Read the content of the HTML file from the document directory
//         const content = await RNFS.readFile(destinationPath, 'utf8');
//         setHtmlContent(content);
//       } catch (error) {
//         console.error('Error reading or copying HTML file:', error);
//       }
//     };

//     fetchHtmlContent();
//   }, [article]);

//   if (!htmlContent) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         originWhitelist={['*']}
//         source={{ html: htmlContent }}
//         style={{ flex: 1 }}
//       />
//     </View>
//   );
// };

// export default HTMLScreen;



// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
// import { WebView } from 'react-native-webview';
// import * as RNFS from 'react-native-fs';

// const HTMLScreen = ({ route }) => {
//   const { article, id } = route.params;
//   const [htmlContent, setHtmlContent] = useState(null);

//   useEffect(() => {
//     const fetchAndSaveHtmlContent = async () => {
//       try {
//         // Construct the destination path in the document directory
//         const fileName = `${article}_${id}.html`;
//         const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

//         // Check if the file already exists in the document directory
//         const fileExists = await RNFS.exists(destinationPath);

//         // If the file doesn't exist, fetch from the API and save it
//         if (!fileExists) {
//           const response = await fetch(
//             `https://uzvp6pj46k.execute-api.us-east-1.amazonaws.com/dev/items?title=${article}&id=${id}`,
//           );
//           const jsonData = await response.json();
//           const fileContent = jsonData.map(item => item.html).join('\n');
//           await RNFS.writeFile(destinationPath, fileContent, 'utf8');
//         }

//         // Read the content of the HTML file from the document directory
//         const content = await RNFS.readFile(destinationPath, 'utf8');
//         setHtmlContent(content);
//       } catch (error) {
//         console.error('Error fetching or reading HTML file:', error);
//         Alert.alert('Error', 'Failed to fetch or read HTML file');
//       }
//     };

//     fetchAndSaveHtmlContent();
//   }, [article, id]);

//   if (!htmlContent) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <WebView
//         originWhitelist={['*']}
//         source={{ html: htmlContent }}
//         style={styles.webview}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   webview: {
//     flex: 1,
//   },
// });

// export default HTMLScreen;









//this is  url data getting



// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function HTMLScreen({ route }) {
//   const { article, id } = route.params;
//   const [content, setContent] = useState([]);
  
//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await fetch(
//           `https://uzvp6pj46k.execute-api.us-east-1.amazonaws.com/dev/items?title=${article}&id=${id}`,
//         );
//         const jsonData = await response.json();
//         setContent(jsonData);
//       } catch (error) {
//         console.error('Error fetching articles:', error);
//       }
//     };
  
//     fetchArticles();
//   }, [article, id]);
  
//   return (
//     <View style={styles.container}>
//       {content && content.length > 0 ? (
//         content.map(item => (
//           <View key={item.id}>
//             {item.type === 'doc' && (
//               <>
//                 <Text style={styles.title}>Doc URL: {item.docUrl}</Text>
//                 <Text style={styles.content}>{item.html}</Text>
//               </>
//             )}
//             {item.type === 'html' && (
//               <>
//                 <Text style={styles.content}>{item.html}</Text>
//                 <Text style={styles.title}>Doc URL: {item.docUrl}</Text>
//               </>
//             )}
//           </View>
//         ))
//       ) : (
//         <Text>No content available</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
    
//   },
//   content: {
//     fontSize: 16,
//     color: '#333',
//   },
// });








import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as RNFS from 'react-native-fs';

const HTMLScreen = ({ route }) => {
  const { article, id } = route.params;
  const [htmlContent, setHtmlContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
