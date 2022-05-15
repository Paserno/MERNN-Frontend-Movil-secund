
import {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';



export const useSocket = (serverPath: any) => {

    // serverPath = 'http://localhost:8082';

    const [socket, setSocket] = useState(null)

    const conectarSocket = useCallback(() => {
        
        const token = AsyncStorage.getItem('token');

        const socketTemp:any = io( serverPath,{ 
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        });
        setSocket(socketTemp);


      }, [serverPath])

      console.log(socket)
    
    return {
        socket,
        conectarSocket
    }
}