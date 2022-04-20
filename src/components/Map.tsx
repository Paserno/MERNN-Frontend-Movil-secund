import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { View } from 'react-native';

interface Props {
  markers?: Marker[];
}

export const Map = ({ markers }:Props) => {
  return (
    <View style={{ flex: 1}}>
        <MapView
            style={{ flex: 1}}
            showsUserLocation
            provider={ PROVIDER_GOOGLE }
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
        >
            {/* <Marker
              image={ require('../assets/custom-marker.png')}
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              title='Esto es un titulo'
              description=' Esto es una descripción del marcador'
            /> */}
        </MapView>
    </View>
  )
}
