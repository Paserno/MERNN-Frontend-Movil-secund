import React, { createContext, useState, useContext,useReducer } from 'react';
import { coordenadasReducer } from '../reducers/coordenadasReducer';


export const CoordenadasContext = createContext({} as any);

const initialState = {
    coorActivo: null, // uid del usuario al que se le quiere enviar mensajes
    coordenadas: {} // Coordenadas Recibidas
}

export const CoordenadasProvider = ({children}: any) => {

    const [emitirCoordenada, setEmitirCoordenada] = useState(true)
    const [idIntervalo, setIdIntervalo] = useState(0)
    // const [recibirCoordenada, setRecibirCoordenada] = useState({})
    const [state, dispatch] = useReducer(coordenadasReducer, initialState)
    // const [coorActiva, setCoorActiva] = useState()

    const compartirCoordenadas = () => {
        setEmitirCoordenada(false)
      }

    const noCompartirCoodrenadas = () => {
        setEmitirCoordenada(true)
    }
    const saveIntervalo = (id: number) => {
        setIdIntervalo(id)
    }
    
    const saveCoordenadas = (payload:any) => {
        
       dispatch({
           type: 'RecibirCoordenadas',
           payload: payload
       })
    }

    const activarUsuarioCoordenada = (id: string) => {
        dispatch({
            type: 'Activar',
            payload: id
        })
    }



    return (
        <CoordenadasContext.Provider value={{
            emitirCoordenada,
            idIntervalo,
            state,
            compartirCoordenadas,
            noCompartirCoodrenadas,
            saveIntervalo,
            saveCoordenadas,
            activarUsuarioCoordenada,
        }}>
            { children }
        </CoordenadasContext.Provider>
    )
 }

