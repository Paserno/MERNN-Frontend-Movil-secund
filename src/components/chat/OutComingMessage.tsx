import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

export const OutComingMessage = ({mss}:any) => {

  // console.log(mss.mensaje)


  return (
    <View style={ styles.container}>
      <Text style={ styles.text}> {mss.mensaje} </Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      minWidth: 10,
      minHeight: 10,
      maxHeight: 200,
      backgroundColor: 'white',
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 50,
      // righ: -100,
      alignSelf: 'flex-start',
      borderBottomEndRadius: 20,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      marginTop: 2
    },
    text : {
      color: 'black',
      margin: 10,
      fontSize: 15,
      // marginLeft: 15
    }
});