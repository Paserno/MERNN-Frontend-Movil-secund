import React, { createContext, useReducer } from 'react';
import { chatReducer } from '../reducers/chatReducer';



export const ChatContext = createContext({} as any);

const initialState = {
    uid: '', // El usuario conectado
    chatActivo: null, // uid del usuario al que se le quiere enviar mensajes
    usuarios: [], // Todos los usuarios de la BD
    mensajes: [], // Los mensajes del chat Seleccionado
}


export const ChatProvider = ({children}: any) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState);


    return(
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            {children}
        </ChatContext.Provider>
    )

}