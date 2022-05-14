import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';



export const Card = () => {

    const uri = 'https://www.xtrafondos.com/wallpapers/paisaje-digital-en-atardecer-5846.jpg'


  return (
    <TouchableOpacity
        activeOpacity={ 0.85 }
        style={ styles.card}
    >
        <View style={styles.userInfo}>
            <Image
                style={ styles.userImg }
                source={{ uri }}
            />
            <View style={styles.textSection}> 
               <Text style={ styles.userName }>Diego Maradona</Text>
            
               <Text style={ styles.userName }>Especialidad: Panadero</Text>

            </View>
            <View>
                <Text style={ styles.pointCustom }>Activo</Text>
            </View>

        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 75,
        // backgroundColor: 'rgba(106, 90, 205, 0.6)',
        borderBottomColor: 'rgba(28, 28, 28, 0.5)',
        borderBottomWidth: 1,
        borderRadius: 15,
        // marginBottom: 12,
        marginTop: 20,
    },
    userInfo: {
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5,
        paddingLeft: 0,
        marginLeft: 50,
        
    },
    userName: {
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