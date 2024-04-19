import messaging from '@react-native-firebase/messaging';

import React ,{useEffect}from 'react';
import { View, Text } from 'react-native';

export default function FirebaseNotification() {

const requestUserPermission=async()=>{
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
}


const getToken=async()=>{
    const token=await messaging().getToken();
    console.log("Token :", token);
}

useEffect(()=>{
    requestUserPermission()
    getToken()

},[])




}
