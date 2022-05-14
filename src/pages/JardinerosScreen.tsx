import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Card } from '../components/Card';
import { BackgroundChat } from '../components/BackgroundChat';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';



export const JardinerosScreen = ({ navigation }: any) => {
  return (
    <BackgroundChat>
      <StatusBar  translucent barStyle="light-content" backgroundColor="transparent" />
    <View style={ styles.sectionText }>
      <TouchableOpacity
        activeOpacity={ 0.8 }
        onPress={ () => navigation.navigate('ProtectedScreen') }
      >
        <Icon 
            name={ 'arrow-back-sharp' }
            color="white"
            size={ 35 }
            style={{ marginLeft: -20}}
        /> 
      </TouchableOpacity>
      <Text style={ styles.title}>Jardineros</Text>
      <TouchableOpacity
        activeOpacity={ 0.8 }
      >
      <Icon 
          name={ 'search-sharp' }
          color="white"
          size={ 34 }
          style={{ marginRight: 20}}
      /> 
      </TouchableOpacity>
      
    </View>
    <View style={ styles.contanierBlanco}>
      <ScrollView>
        <View style={ styles.contanier }>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </View>
      </ScrollView>
    </View>

    
    </BackgroundChat>
  )
}

const styles = StyleSheet.create({
  contanierBlanco: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 10,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25
},
    contanier: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
      alignItems: 'center',
      // backgroundColor: 'rgba(255, 255, 255, 0.4)',
      // marginTop: 10,
      // borderTopEndRadius: 25,
      // borderTopStartRadius: 25
        
    },
    sectionText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      marginTop: 30,
      paddingLeft: 0,
      marginLeft: 50,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'rgba(255, 255, 255, 0.85)'
  },

});