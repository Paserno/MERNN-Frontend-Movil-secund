import React, {useContext} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ItemTable } from './ItemTable';
import { UsuarioContext } from '../context/UsuarioContext';
//  { JSON.stringify(isEnabled, null, 5) }

export const Table = () => {

  const {detalleSolicitud} = useContext(UsuarioContext);

  const renderItem = ({item}:any) => (
    <ItemTable item={item}/>
  )

  return (
    <View style={{ }}>
      <View style={{...styles.tableDetalle}}>
      <View style={{ width: 110 }}>
        <Text>Servicio</Text>
      </View>
      <View style={{ width: 80, marginLeft: 10}}>
        <Text>Precio</Text>
      </View>
      <View style={{ width: 60, marginLeft: 10}}>
        <Text>Estado</Text>
      </View>
      <View style={{ width: 60, marginLeft: 10}}>
        <Text>Editar</Text>
      </View>
      
    </View>
        <FlatList 
          data={ detalleSolicitud }
          renderItem={renderItem}
          keyExtractor={(item,index)=> index.toString()}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    tableDetalle: {
      flexDirection: 'row',
      borderBottomColor: 'rgba(160,160,160,0.8)',
      borderBottomWidth: 2,
      marginLeft: 10,
      marginRight: 10,
    }
});