import React from 'react'
import { View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { BackgroundChat } from '../components/BackgroundChat';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { SendMessage } from '../components/chat/SendMessage';


export const ChatScreen = ({route}: any) => {

    // En los params.id se recibe el id de la persona seleccionada.
    const { params} = route;
    const navigator = useNavigation();


  return (
    
    <BackgroundChat>
            <StatusBar  translucent barStyle="light-content" backgroundColor="transparent" />

        <View style={ styles.sectionText }>
      <TouchableOpacity
        activeOpacity={ 0.8 }
        onPress={ () => navigator.dispatch(CommonActions.goBack())}
    
      >
        <Icon 
            name={ 'arrow-back-sharp' }
            color="white"
            size={ 35 }
            style={{ marginLeft: -20}}
        /> 
      </TouchableOpacity>
      <Text style={ styles.title}>Chat</Text>
      <TouchableOpacity
        activeOpacity={ 0.8 }
      >
      <Icon 
          name={ 'ellipsis-vertical-sharp' }
          color="white"
          size={ 34 }
          style={{ marginRight: 20}}
      /> 
      </TouchableOpacity>
    </View>

    <View style={ styles.contanierBlanco}>
        <SendMessage />
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