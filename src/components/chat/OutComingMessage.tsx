import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

export const OutComingMessage = () => {
  return (
    <View style={ styles.container}>
      <Text style={ styles.text}>Laborum quis aute qui aliquip dolor ex commodo adipisicing voluptate esse do anim adipisicing ea. Cillum aliquip </Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      maxWidth: 300,
      maxHeight: 200,
      backgroundColor: 'white',
      marginBottom: 10,
      marginLeft: 30,
      righ: -100,
      borderBottomEndRadius: 20,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
    },
    text : {
      color: 'black',
      margin: 7,
      fontSize: 15
    }
});