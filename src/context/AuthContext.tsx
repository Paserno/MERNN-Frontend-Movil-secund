import React, { createContext, useReducer, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import connectionApi from '../api/ConnectionApi';

import { Usuario, LoginResponse, LoginData, RegisterData } from '../interface/loginInterfaces';
import { authReducer, AuthState } from './authReducer';
import { ChatContext } from './ChatContext';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    logged: boolean;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( registerdata :RegisterData) => void;
    signIn: ( logindata: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;

}

const authInicialState : AuthState = {
    status: 'checking',
    logged: false,
    token: null,
    user: null,
    errorMessage: '',
}

export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: any) => {

    const [state, dispatchs] = useReducer(authReducer, authInicialState);
    const {dispatch}= useContext(ChatContext);


    useEffect(() => {
      
        checkToken();
        

    }, [])

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');

        // No hay token
        if ( !token ) return dispatchs({ type: 'notAuthenticated'});

        // Hay Token
        const resp = await connectionApi.get('/auth');
        if ( resp.status !== 200 ){
            return dispatchs({ type: 'notAuthenticated'});
        }

        await AsyncStorage.setItem('token', resp.data.token );
        dispatchs({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario,
                logged: true
            }
        });

    
    }    

    const signIn = async({ correo, password }: LoginData ) => {
        try {

            const { data } = await connectionApi.post<LoginResponse>('/auth/login', { correo, password });
            dispatchs({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario,
                    logged: true
                }
            });

            await AsyncStorage.setItem('token', data.token );
            
        } catch (error: any) {
            dispatchs({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };


    const signUp = async({ correo, password, nombre, apellido, ciudad, direccion }: RegisterData) => {
        try {
        const { data } = await connectionApi.post<LoginResponse>('/usuarios', { correo, password, nombre, apellido, ciudad, direccion });
        dispatchs({
            type: 'signUp',
            payload: {
                token: data.token,
                user: data.usuario,
                logged: true
            }
        });

        await AsyncStorage.setItem('token', data.token );
            
        } catch (error: any) {
            dispatchs({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Revisar Información'
            })
        }

    };
    
    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({
            type: 'CerrarSesion'
        })


        dispatchs({ type: 'logout' });
    };

    const removeError = () => {

        dispatchs({ type: 'removeError'})
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