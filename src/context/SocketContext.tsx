import React, { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AuthContext } from './AuthContext';
import { AuthState } from './authReducer';
import { ChatContext } from './ChatContext';


export const SocketContext = createContext({} as any);

export const SocketProvider = ({children}:any) => {

    const {dispatch, chatState}= useContext(ChatContext);
    const { socket, conectarSocket } = useSocket('http://192.168.1.84:8082');
    const { logged, user }: AuthState = useContext(AuthContext);

    useEffect(() => {
        if(logged){
            // console.log(user?.uid)
            conectarSocket();
        }
    }, [ logged, conectarSocket])

    
    
    useEffect(() => {
        console.log(socket);
        console.log(chatState);
        socket?.on('mensaje-personal', (mensaje:any) => {
            console.log(mensaje);
            console.log('xd');
            dispatch({
                type: 'nuevoMensaje',
                payload: mensaje
            })
        });

    }, [socket, dispatch])

    return (
        <SocketContext.Provider value={{
            socket
        }}>
            { children}
        </SocketContext.Provider>
    )
}