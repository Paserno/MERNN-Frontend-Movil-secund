import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

export const InComingMessage = ({mss}:any) => {

  // console.log(mss.mensaje)
  return (
    <View style={ styles.container}>
      <Text style={ styles.text }> {mss.mensaje}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      
      maxWidth: 300,
      maxHeight: 200,
      backgroundColor: '#156DD1',
      marginBottom: 10,
      marginLeft: 40,
      right: -50,
      borderBottomStartRadius: 20,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,


    },
    text : {
      color: 'white',
      margin: 10,
      fontSize: 15

    }
});