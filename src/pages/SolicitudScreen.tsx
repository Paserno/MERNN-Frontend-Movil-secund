import { StackActions } from '@react-navigation/native';
import React from 'react'
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const SolicitudScreen = ({navigation}: any) => {
  const popAction = StackActions.pop(1);

   
  return (
    <View>
        <Text>SolicitudScreen</Text>
        <TouchableOpacity
          onPress={ ()=> navigation.dispatch(popAction)}
        >
          <Text>Volver</Text>
        </TouchableOpacity>
    </View>
  )
}
