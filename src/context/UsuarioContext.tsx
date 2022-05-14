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
}

export const UsuarioContext = createContext({} as any);

export const UsuarioProvider = ({ children }: any ) => {

    const [state, dispatch] = useReducer(usuarioReducer, initialState)

    const cargarUsuario = async() => {
        try {
        const {data} = await connectionApi.get('/jardin', {});

        if (data.ok){
            const usuarios = data.usuarios
            dispatch({
                type: 'cargarUsuarios',
                payload: usuarios
                
            })
        }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UsuarioContext.Provider value={{
            ...state,
            cargarUsuario
        }}>
            { children }
        </UsuarioContext.Provider>
    )
}


