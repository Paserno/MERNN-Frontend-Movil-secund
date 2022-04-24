import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import connectionApi from '../api/ConnectionApi';

import { Usuario, LoginResponse, LoginData } from '../interface/loginInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: () => void;
    signIn: ( logindata: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;

}

const authInicialState : AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
}

export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInicialState);

    useEffect(() => {
      
        checkToken();
        

    }, [])

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');

        // No hay token
        if ( !token ) return dispatch({ type: 'notAuthenticated'});

        // Hay Token
        const resp = await connectionApi.get('/auth');
        if ( resp.status !== 200 ){
            return dispatch({ type: 'notAuthenticated'});
        }

        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        });

    
    }    

    const signIn = async({ correo, password }: LoginData ) => {
        try {

            const { data } = await connectionApi.post<LoginResponse>('/auth/login', { correo, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

            await AsyncStorage.setItem('token', data.token );
            
        } catch (error: any) {
            console.log(error.response.data.msg);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };


    const signUp = () => {};
    const logOut = () => {};

    const removeError = () => {

        dispatch({ type: 'removeError'})
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
            
        }}>
            { children }
        </AuthContext.Provider>
    )

} 