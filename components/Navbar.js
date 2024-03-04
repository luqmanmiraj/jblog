import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Navbar() {
  return (
    <View style={styles.navbar}>
    {/* icon here */}
    <Icon name="bars" size={30} color="#FF4500" />
      <Text style={styles.headertext}>BLOG APP</Text>
    <Icon name="search" size={30} color="#FF4500" />
 {/* icon here */}
    </View>
  )
}

const styles=StyleSheet.create({
    navbar: {
        textAlign: "center",
        padding: 10,
        paddingTop:20,
        paddingBottom:20,
        justifyContent:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        borderBottomWidth: 1,
        borderBottomColor: "gray", 
      },
      headertext:{
        color: "#FF4500",
         fontSize: 24,
          fontWeight:"800",
      }
})
