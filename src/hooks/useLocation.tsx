import { useEffect, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interface/appInterface';



export const useLocation = () => {

    const [ hasLocation, setHasLocation ] = useState(false);
    const [ initialPosition, setInitialPosition ] = useState<Location>({
        latitud: 0,
        longitud: 0
      });

    useEffect(() => {
        Geolocation.getCurrentPosition(
            ({ coords }) => {

                setInitialPosition({
                    latitud: coords.latitude,
                    longitud: coords.longitude
                });
                setHasLocation(true);

            }, // OK
            (err) => console.log({ err }), // Error
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            } //Opciones
        );

    }, [])

    return {
        hasLocation,
        initialPosition

    }
}
