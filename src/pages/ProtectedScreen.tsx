import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, StatusBar, Switch } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UsuarioContext } from '../context/UsuarioContext';
import { PlantLogo } from '../components/PlantLogo';
import Icon from 'react-native-vector-icons/Ionicons';
import { SocketContext } from '../context/SocketContext';


interface Props extends StackScreenProps<any, any> { }


export const ProtectedScreen = ({ navigation }: Props) => {

  const { user, logOut } = useContext(AuthContext);
  const uid = user?.uid;

  const { loginJardinero, jardinero, actualizarJardinero, jid } = useContext(UsuarioContext);
  const { desconectarSocketChat } = useContext(SocketContext);

  const [isEnabled, setIsEnabled] = useState(jardinero.activo);

  useEffect(() => {
    if (jardinero) {
      setIsEnabled(jardinero.activo)
    }
  }, [jardinero])
  

  const toggleSwitch = () => {
    if (isEnabled) {
      const activo = false
      setIsEnabled(false)
      actualizarJardinero(jid, activo);
    } else {
      const activo = true
      setIsEnabled(true)
      actualizarJardinero(jid, activo);
    }
  };


  useEffect(() => {
    loginJardinero(uid);
  }, [])

  const onClickLogOut = () => {
    logOut()
    desconectarSocketChat()
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <PlantLogo />

      <Text style={styles.title}>Bienvenido: {user?.nombre}</Text>

      <View style={styles.contanierBlanco}>

      <View style={{
          position: 'absolute',
          top: 20,
          left: 20,
          flexDirection: 'row'
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop:-3, width: 100}}> {(isEnabled) ? 'Activo:':'Desactivo:'} 
        </Text>
          <Switch
            trackColor={{ false: "#979699", true: "#84B374" }}
            thumbColor={isEnabled ? "#D9D6DE" : "#D9D6DE"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
      </View>

        {/* <Text>
          { JSON.stringify(user, null, 5) }
        </Text>
        <Text>
          { token }
        </Text> */}

        {/* <TouchableOpacity
        activeOpacity={ 0.8 }
        onPress={ () => navigation.navigate('Navigator') }
        style={ styles.button }
        >
          <Text style={ styles.buttonText}> Mapa</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('EditarScreen', { usuario: user })}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('JardinerosScreen')}
          style={{ ...styles.button, width: 135 }}
        >
          <Text style={styles.buttonText}> Jardineros</Text>
          <Icon
            name={'chevron-forward-outline'}
            color="white"
            size={25}
            style={{}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onClickLogOut}
          style={styles.buttonLogout}
        >
          <Text style={styles.buttonTextLogout}>Logout </Text>
          <Icon
            name={'exit-outline'}
            color="#dc3545"
            size={25}
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
    flexDirection: 'row',
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
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  buttonTextLogout: {
    fontSize: 20,
    color: '#dc3545'
  },
});