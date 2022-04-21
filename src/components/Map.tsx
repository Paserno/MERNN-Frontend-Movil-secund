import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { View } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Location } from '../interface/appInterface';
import { Fab } from './Fab';


interface Props {
  markers?: Marker[];
}

export const Map = ({ markers }:Props) => {

  const { hasLocation, initialPosition } = useLocation();

  if ( !hasLocation ){
    return <LoadingScreen />
  }
  
  return (
    <View style={{ flex: 1}}>
        <MapView
            style={{ flex: 1}}
            showsUserLocation
            provider={ PROVIDER_GOOGLE }
            initialRegion={{
              latitude: initialPosition.latitud,
              longitude: initialPosition.longitud,
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

        <Fab 
          iconName='star-outline'
          onPress={ () => console.log('Hola FAB') }
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20
          }}
        />
    </View>
  )
}
20