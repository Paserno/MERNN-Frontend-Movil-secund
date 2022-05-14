import React from 'react'
import { View, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';


export const SendMessage = () => {
  return (
    <View style={styles.containerInput}>
        <View style={styles.rowContainer}>

        
        <TouchableOpacity
            style={ styles.icon1 }

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
    
        />


        <TouchableOpacity
                style={ styles.icon2 }
        
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