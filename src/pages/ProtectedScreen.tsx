import React, { useContext } from 'react'
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<any, any> {}


export const ProtectedScreen = ({ navigation }: Props) => {

  const { user, token, logOut } = useContext( AuthContext );

  return (
    <View style={ styles.container }>
      <StatusBar  translucent barStyle="dark-content" backgroundColor="transparent" />

        <Text style={ styles.title }>ProtectedScreen</Text>

        <Button 
          title='logout'
          color='#dc3545'
          onPress={ logOut }
        />

        <Text>
          { JSON.stringify(user, null, 5) }
        </Text>
        <Text>
          { token }
        </Text>

        <TouchableOpacity
        activeOpacity={ 0.8 }
        onPress={ () => navigation.navigate('Navigator') }
        style={ styles.button }
        >
          <Text style={ styles.buttonText}> Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity
        activeOpacity={ 0.8 }
        onPress={ () => navigation.navigate('JardinerosScreen') }
        style={{ ...styles.button, width: 135 }}
        >
          <Text style={ styles.buttonText}> Jardineros</Text>
        </TouchableOpacity>
        
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      marginBottom: 20
    },
    button: {
      marginTop: 20,
      backgroundColor: '#5856D6',
      height: 40,
      width: 90,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  buttonText:{
    fontSize: 20,
    color: 'white'
},
});