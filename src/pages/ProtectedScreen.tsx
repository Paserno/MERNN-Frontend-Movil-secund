import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UsuarioContext } from '../context/UsuarioContext';
import { PlantLogo } from '../components/PlantLogo';
import Icon from 'react-native-vector-icons/Ionicons';


interface Props extends StackScreenProps<any, any> {}


export const ProtectedScreen = ({ navigation }: Props) => {

  const { user, token, logOut } = useContext( AuthContext );

  const {cargarUsuario} = useContext(UsuarioContext);

  useEffect(() => {
      cargarUsuario();
    }, [])

  return (
    <View style={ styles.container }>
      <StatusBar  translucent barStyle="light-content" backgroundColor="transparent" />
      <PlantLogo />

      <Text style={ styles.title }>Bienvenido: {user?.nombre}</Text>

      <View style={ styles.contanierBlanco }>

       

        {/* <Text>
          { JSON.stringify(user, null, 5) }
        </Text>
        <Text>
          { token }
        </Text> */}

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
          <Icon 
                name={ 'chevron-forward-outline' }
                color="white"
                size={ 25 }
                style={{}}
            /> 
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={ 0.6 }
          onPress={ logOut }
          style={ styles.buttonLogout }
        >
          <Text style={ styles.buttonTextLogout}>Logout </Text>
          <Icon 
                name={ 'exit-outline' }
                color="#dc3545"
                size={ 25 }
                style={{}}
            /> 
        </TouchableOpacity>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  contanierBlanco: {
    flex: 1,
    backgroundColor: 'rgba(195, 208, 195, 0.9)',
    marginTop: 200,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center'
    },
    title: {
      top: 50,
      left: 30,
      // marginTop: 40,
      fontSize: 30,
      fontWeight: 'bold',
      color: 'rgba(255, 255, 255, 1)'
    },
    button: {
      marginTop: 20,
      flexDirection:'row',
      backgroundColor: '#5856D6',
      height: 40,
      minWidth: 120,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  buttonLogout: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#dc3545',
    minHeight: 40,
    minWidth: 120,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
},
  buttonText:{
    fontSize: 20,
    color: 'white'
},
buttonTextLogout:{
  fontSize: 20,
  color: '#dc3545'
},
});