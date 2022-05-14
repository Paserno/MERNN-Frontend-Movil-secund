import React from 'react'
import { View, Text, StatusBar } from 'react-native';
import { BackgroundChat } from '../components/BackgroundChat';

export const ChatScreen = ({route}: any) => {

    // En los params.id se recibe el id de la persona seleccionada.
    const { params} = route;


  return (
    
    <BackgroundChat>
        <View style={{ marginBottom: 25}}>
            <StatusBar  translucent barStyle="light-content" backgroundColor="transparent" />
        </View>

        <Text> hola mundo</Text>
    </BackgroundChat>
  )
}
