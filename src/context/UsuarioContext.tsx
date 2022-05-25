import React, { createContext, useReducer } from 'react'
import { usuarioReducer } from '../reducers/usuarioReducer';
import connectionApi from '../api/ConnectionApi';
// import { Jardin } from '../interface/activoInterface';



const initialState = {
    isLoading: true,
    usuarios: [],   // Todos los usuartios de la base de dato
    jardineros: [],
    jardinero: {},
    usuario: {},   // Un Registro de la BD
    jid: '',
    solicitudes: []
}

export const UsuarioContext = createContext({} as any);

export const UsuarioProvider = ({ children }: any ) => {

    const [state, dispatch] = useReducer(usuarioReducer, initialState)

    const cargarSolicitudUsuario = async(id: string) => {
        try {
        const {data} = await connectionApi.get(`/soli/${id}`, {});
        if (data.ok){
            const solicitudes = data.solicitudes
            dispatch({
                type: 'cargarSolicitudUsuario',
                payload: solicitudes
                
            })
        }
            
        } catch (error) {
            console.log(error);
        }
    }

    const loginJardinero = async(id: string) => {
        try {
        const {data} = await connectionApi.get(`/admin/jardin/${id}`, {});
            if (data.ok) {
                const jardinero = data.jardinero 
                cargarSolicitudUsuario(jardinero._id);

                dispatch({
                    type: 'loginJardinero',
                    payload: jardinero
                })


            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UsuarioContext.Provider value={{
            ...state,
             cargarSolicitudUsuario,
             loginJardinero
        }}>
            { children }
        </UsuarioContext.Provider>
    )
}


