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
      minWidth: 10,
      minHeight: 10,
      maxHeight: 200,
      // maxWidth: 200,
      alignSelf: 'flex-end',
      // minWidth: 100,
      backgroundColor: '#156DD1',
      marginBottom: 10,
      marginLeft: 50,
      marginRight: 20,
      // right: -50,
      borderBottomStartRadius: 20,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      

    },
    text : {
      color: 'white',
      margin: 12,
      fontSize: 15,
      alignSelf: 'flex-end',
      // backgroundColor: 'red'

    }
});