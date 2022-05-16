
import {useCallback, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io }  from 'socket.io-client';



export const useSocket = (serverPath:any) => {

    // const serverPath = 'http://192.168.1.84:8082';

    const [socket, setSocket]:any = useState(null);

    
    const conectarSocket = useCallback(async() => {
        
        const token = await AsyncStorage.getItem('token');
        
        const socketTemp = io( serverPath, { 
            transports: ['websocket'],
            reconnection: true,
            autoConnect: true,
            forceNew: true,
            'extraHeaders': {
                'x-token': token!
            }
        });
        
        setSocket(socketTemp);

      }, [serverPath]);


    const desconectarSocket = useCallback(() => {
        socket?.disconnect();

    }, [socket]);


    
    return {
        socket,
        conectarSocket,
        desconectarSocket
        
    }
}