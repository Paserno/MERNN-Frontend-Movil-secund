
import {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket }  from 'socket.io-client';



export const useSocket = (serverPath: any) => {

    // serverPath = 'http://192.168.1.84:8082';

    const [socket, setSocket]:any = useState(null)
    
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


    //   const emitirMensaje = (uid: any, id: string, mensaje: string) => {
    //       console.log(uid, id, mensaje)
    //       console.log(socket);
    //       socket?.emit('mensaje-personal',{
    //         de: uid,
    //         para: id,
    //         mensaje
    //    })
    //   }

    
    return {
        socket,
        conectarSocket,
        
    }
}