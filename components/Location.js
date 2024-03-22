

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import MapView from 'react-native-maps';

// export default function LocationService() {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     // Request location permission
//     const requestLocationPermission = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           // Get current position
//           Geolocation.getCurrentPosition(
//             position => {
//               setLocation(position.coords);
//             },
//             error => {
//               console.log(error.message);
//             },
//             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//           );
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     };

//     requestLocationPermission();

//     // Clean up
//     return () => {
//       Geolocation.clearWatch();
//     };
//   }, []);

//   return (
//     <View>
//       <Text style={styles.text}>Location</Text>
//       {location && (
//         <View>
//           <Text style={styles.text}>Latitude: {location.latitude}</Text>
//           <Text style={styles.text}>Longitude: {location.longitude}</Text>
//         </View>
//       )}
//     </View>
//   );
// }




// const styles = StyleSheet.create({
//     text: {
//      color: 'white'
      
//     },
// })  










import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function LocationService() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Request location permission
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Get current position
          Geolocation.getCurrentPosition(
            position => {
              setLocation(position.coords);
            },
            error => {
              console.log(error.message);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();

    // Clean up
    return () => {
      Geolocation.clearWatch();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Location</Text>
      {/* <View>
          <Text style={styles.text}>Latitude: {location.latitude}</Text>
           <Text style={styles.text}>Longitude: {location.longitude}</Text>
         </View> */}

      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description="You are here!"
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
    // Set background color to white
  },
  map: {
    // marginTop: 40,
    paddingTop: 40,
    width: '100%', // Take up the entire width
    height: '80%', // Take up 70% of the height
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF4500',
    marginTop:10
  },
});
