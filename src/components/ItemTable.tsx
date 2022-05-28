import React, {useContext} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SocketContext } from '../context/SocketContext';
import { UsuarioContext } from '../context/UsuarioContext';


export const ItemTable = ({item}:any) => {
  const {socket} = useContext(SocketContext)
  const {selecionarDetalleSolicitud} = useContext(UsuarioContext)
  
  
  const onClick = () => {
    selecionarDetalleSolicitud(item);
    
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
        <Text>{JSON.stringify(item.realizado, null, 5)}</Text>
      </View>
      <View style={{ width: 80, marginLeft: 10, height:30 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onClick}
        >
          <Icon 
              name={ 'create-sharp' }
              color="#5856D6"
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