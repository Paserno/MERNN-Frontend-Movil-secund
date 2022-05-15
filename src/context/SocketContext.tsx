import React, { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AuthContext } from './AuthContext';
import { AuthState } from './authReducer';


export const SocketContext = createContext({} as any);

export const SocketProvider = ({children}:any) => {

    const { socket, conectarSocket } = useSocket('http://localhost:8082');
    const { logged, user }: AuthState = useContext(AuthContext)

    useEffect(() => {
        if(logged){
            console.log(user?.uid)
            conectarSocket();
        }
    }, [ logged, conectarSocket])
    

    return (
        <SocketContext.Provider value={{
            socket
        }}>
            { children}
        </SocketContext.Provider>
    )
}