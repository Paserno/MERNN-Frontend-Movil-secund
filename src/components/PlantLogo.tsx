import React from 'react';
import { Image, View } from 'react-native';

export const PlantLogo = () => {
  return (
    <View style={{
        alignItems: 'center'
    }}>
        
        <Image 
            source={ require('../assets/plantas.jpg')}
            style={{
                flex:1 ,
                position: 'absolute'
            }}
            blurRadius={1}
        />
        
        
    </View>
  )
}
