import { CommonActions, useNavigation } from '@react-navigation/native';
import React, {useContext} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ChatContext } from '../context/ChatContext';
import connectionApi from '../api/ConnectionApi';




export const Card = ({datos}: any) => {

    const {dispatch} = useContext(ChatContext);

    const uri = 'https://www.xtrafondos.com/wallpapers/paisaje-digital-en-atardecer-5846.jpg'
    
    const {nombre, apellido, jardinero, _id: id} = datos 
    const especialidad = jardinero.especialidad;
    
    
    const navigator = useNavigation();


   const onClick = async() => {

    dispatch({
        type: 'ActivarChat',
        payload: id
    });

    const {data} = await connectionApi.get(`mensajes/${id}`, {});

    dispatch({
        type: 'cargarMensajes',
        payload: data.mensajes
    })


    navigator.dispatch(
        CommonActions.navigate({
            name: 'ChatScreen',
            params: { id: id}
        })
    )


   }


  return (
    <TouchableOpacity
        activeOpacity={ 0.85 }
        style={ styles.card}
        onPress={onClick}
    >
        <View style={styles.userInfo}>
            <Image
                style={ styles.userImg }
                source={{ uri }}
            />
            <View style={styles.textSection}> 
               <Text style={ styles.userName }>{nombre} {apellido}</Text>
            
               <Text style={ styles.userName }>Especialidad: {especialidad}</Text>

            </View>
            <View style={{ right: 20}}>
                {/* chevron-forward-sharp */}
                <Icon 
                    name={ 'chevron-forward-sharp' }
                    color="rgba(66, 66, 66, 0.7)"
                    size={ 34 }
                    style={{ marginTop: 10, position:'absolute'}}
                /> 
            </View>

        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card: {
    
        width: '100%',
        height: 75,
        // backgroundColor: 'red',
        borderBottomColor: 'rgba(28, 28, 28, 0.5)',
        borderBottomWidth: 1,
        borderRadius: 15,
        marginTop: 20,
    },
    userInfo: {
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textSection: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 5,
        paddingLeft: 0,
        marginLeft: -10,
        width: 220,
        // backgroundColor: 'blue'
        
    },
    userName: {
        justifyContent: 'flex-start',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
        color: 'rgba(0, 0, 0, 0.75)'
    },
    userImg: {
        width: 55,
        height: 55,
        borderRadius: 25,
        
    },
    pointCustom: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
        color: 'rgba(0, 0, 0, 0.8)'
    }

});