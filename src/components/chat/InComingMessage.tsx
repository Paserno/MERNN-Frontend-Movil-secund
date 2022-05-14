import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

export const InComingMessage = () => {
  return (
    <View style={ styles.container}>
      <Text style={ styles.text }>Excepteur esse velit nisi ullamco sint ex occaecat non dolor anim aliquip. Officia id ea anim reprehenderit magna excepteur sunt ea cillum. Exercitation non et mollit officia eiusmod voluptate. </Text>
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
      margin: 7,
      fontSize: 15

    }
});