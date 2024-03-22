// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import VIForegroundService from '@voximplant/react-native-foreground-service';

// export default function Service() {
//   useEffect(() => {
//      createChannel();
      
//     return () => {
     
//     };
//   }, []);

//   const createChannel = async () => {
//     const channelConfig = {
//       id: 'channelId',
//       name: 'Channel name',
//       description: 'Channel description',
//       enableVibration: false,
//     };
//     await VIForegroundService.createNotificationChannel(channelConfig);
//   };

//   const startForegroundService = async () => {
//     console.log('Starting foreground service...');
//     const notificationConfig = {
//       channelId: 'channelId',
//       id: 3456,
//       title: 'Title',
//       text: 'Some text',
//       icon: 'ic_icon',
//       button: 'Some text',
//   };
//   try {
//       await VIForegroundService.getInstance().startService(notificationConfig);
//   } catch (e) {
//       console.error(e);
//   }
//   };

//   const stopForegroundService = async () => {
//     console.log('Stopping foreground service...');
//     try {
//       await VIForegroundService.getInstance().stopService();
//       console.log('Foreground service stopped successfully.');
//     } catch (e) {
//       console.error('Error stopping foreground service:', e);
//     }
//   };

//   return (
//     <View>
//       <TouchableOpacity style={{ backgroundColor: "green", padding: 10, marginVertical: 5 }} onPress={()=>{startForegroundService()}}>
//         <Text style={{ color: "white" }}>Start Foreground Service</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={{ backgroundColor: "red", padding: 10, marginVertical: 5 }} onPress={()=>{stopForegroundService()}}>
//         <Text style={{ color: "white" }}>Stop Foreground Service</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
