import React, {useContext, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SocketContext } from '../context/SocketContext';
import { UsuarioContext } from '../context/UsuarioContext';


export const ItemTable = ({item}:any) => {
  const {socket} = useContext(SocketContext)
  const {selecionarDetalleSolicitud, solicitud} = useContext(UsuarioContext)
  const [isEnabled, setIsEnabled] = useState(item.realizado);

  const toggleSwitch = () => {
    (!isEnabled)
      ?(
    Alert.alert('Tarea Lista', '¿Seguro que termino esta tarea?',[
      {
        text: 'Cancelar',
        onPress: () => null
      },
      {
        text: 'Aceptar',
        onPress: () => setIsEnabled(true)
      }
    ])
      )
      : null

    
  };
  
  const onClick = () => {
    selecionarDetalleSolicitud(item);
  }

  const deshabilitarEditar = () => {
    return (solicitud.confirmacion) ? false : true; 
  }

  const deshabilitarSwitch = () => {
    return (solicitud.start) ? true : false; 
  }


  return (
    <View style={{...styles.tableDetalle}}>
      <View style={{ width: 110, height:30}}>
        <Text>{item.idTipoServicio.nombre}</Text>
      </View>
      <View style={{ width: 80, marginLeft: 10, height:30}}>
        <Text>{item.precio}</Text>
      </View>
      <View style={{ width: 60, marginLeft: 10, height:30 }}>
      <Switch
            trackColor={{ false: "#979699", true: "#84B374" }}
            thumbColor={(solicitud.start) 
              ? (isEnabled ? "#5856D6" : "#5856D6")
              : (isEnabled ? "#D9D6DE" : "#D9D6DE") 
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ alignSelf: 'flex-start'}}
            disabled={!deshabilitarSwitch()}

          />
      </View>
      <View style={{ width: 80, marginLeft: 10, height:30 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onClick}
          disabled={!deshabilitarEditar()}
        >
          <Icon 
              name={ 'create-sharp' }
              color={(solicitud.confirmacion) ? '#A3A3BD': "#5856D6"}
              size={ 20 }
              style={{ marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    tableDetalle: {
      borderBottomColor: 'rgba(160,160,160,0.5)',
      borderBottomWidth: 1,
      marginLeft: 10,
      marginRight: 10,
      flexDirection: 'row'
    }
});

// 