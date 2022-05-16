
import {useCallback, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket }  from 'socket.io-client';
import { ChatContext } from '../context/ChatContext';



export const useSocket = (serverPath: any) => {

    // serverPath = 'http://192.168.1.84:8082';

    const [socket, setSocket]:any = useState(null);
    const { dispatch } = useContext( ChatContext );

    
    const conectarSocket = useCallback(async() => {
        
        const token = await AsyncStorage.getItem('token');
        
        const socketTemp = io( serverPath, { 
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            'extraHeaders': {
                'x-token': token!
            }
        });
        
        setSocket(socketTemp);

      }, [serverPath])


      useEffect(() => {
        
        socket?.on('mensaje-personal', (mensaje:any) => {
            console.log(mensaje);
            console.log('xd');
            dispatch({
                type: 'nuevoMensaje',
                payload: mensaje
            })
        });

    }, [socket, dispatch])

    
    return {
        socket,
        conectarSocket,
        
    }
}