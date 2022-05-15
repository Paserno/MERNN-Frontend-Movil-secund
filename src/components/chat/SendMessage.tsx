import React, {useContext} from 'react'
import { View, StyleSheet, Keyboard } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext';
import { useSocket } from '../../hooks/useSocket';


export const SendMessage = ({value}: any) => {

    // const {emitirMensaje} = useSocket({} as any );

    const {user} = useContext(AuthContext);
    const {socket} = useContext(SocketContext);

    const { mensaje, onChange, onReset} = useForm({
        mensaje: ''
    })
    const { id } = value

    const onMessage = () => {
        Keyboard.dismiss();

        if (mensaje.length === 0 ){ return; }
        onReset()

        socket.emit( 'mensaje-personal',{
             de: user?.uid,
             para: id,
             mensaje
        })
    }


  return (
    <View style={styles.containerInput}>
        <View style={styles.rowContainer}>

        
        <TouchableOpacity
            style={ styles.icon1 }
            activeOpacity={ 0.5 }
        >
            <Icon 
                name={ 'add-circle-sharp' }
                color="black"
                size={ 30 }
                style={ styles.icon1 }
            /> 

        </TouchableOpacity>
        <TextInput 
        style={ styles.inputField}
        value={ mensaje }
        onChangeText={ (value) => onChange(value, 'mensaje')}
        onSubmitEditing= { onMessage }
        

        />


        <TouchableOpacity
                style={ styles.icon2 }
                activeOpacity={ 0.5 }
                onPress={ onMessage }
        >
            <Icon 
                name={ 'send' }
                color="black"
                size={ 27 }
                style={{

                }}
            /> 
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    containerInput: {
        position: 'absolute',
        backgroundColor: 'white',
        width: '90%',
        bottom: 20,
        borderRadius: 25,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'flex-end',
        
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%',

    },
    inputField: {
        color: 'black',
        fontSize: 20,
        width: 220,
        // backgroundColor: 'red',
    },
    icon1: {
        marginLeft: 10,
        marginRight: 10,
    },
    icon2: {
        marginLeft: 20,
        
    }

});