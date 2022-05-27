import React, {useContext} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SocketContext } from '../context/SocketContext';


export const ItemTable = ({item}:any) => {
    // console.log(item);
    const {socket} = useContext(SocketContext)

    const eliminarBloqueado = () => {
        return (!item.realizado) ? true : false;
    }

    

    

  return (
    <View style={{...styles.tableDetalle}}>
      <View style={{ width: 110, height:30}}>
        <Text>{item.idTipoServicio.nombre}</Text>
      </View>
      <View style={{ width: 100, marginLeft: 10, height:30}}>
        <Text>{item.precio}</Text>
      </View>
      <View style={{ width: 80, marginLeft: 10, height:30}}>
        <Text>{JSON.stringify(item.realizado, null, 5)}</Text>
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