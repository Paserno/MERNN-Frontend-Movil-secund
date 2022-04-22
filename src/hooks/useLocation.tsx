import { useEffect, useRef, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interface/appInterface';



export const useLocation = () => {

    const [ hasLocation, setHasLocation ] = useState(false);
    const [routeLine, setRouteLine] = useState<Location[]>([]);

    const [ initialPosition, setInitialPosition ] = useState<Location>({
        latitude: 0,
        longitude: 0
      });

    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const watchId = useRef<number>()

    useEffect(() => {

        getCurrentLocation()
            .then( location => {
                setInitialPosition(location);
                setUserLocation(location);
                setRouteLine( routes => [ ...routes, location ]);
                setHasLocation(true);
            });

    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise( (resolve, reject) => {

            Geolocation.getCurrentPosition(
                ({ coords }) => {
    
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
    
                }, // OK
                (err) => reject({ err }), // Error
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000
                } //Opciones
            );
        }) 
    }

    const followUserLocation = () => {
        
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }

                setUserLocation(location);
                setRouteLine( routes => [ ...routes, location ]);


            }, // OK
            (err) => console.log(err), // Error
            {
                enableHighAccuracy: true,
                distanceFilter: 10
            } //Opciones
        );
       
    }


    const stopFollowUserLocation = () => {
        if (watchId.current){
            Geolocation.clearWatch( watchId.current );
        }
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLine
    }
}
