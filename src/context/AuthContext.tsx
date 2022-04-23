import React, { createContext, useReducer } from 'react';
import { Usuario, LoginResponse, LoginData } from '../interface/loginInterfaces';
import { authReducer, AuthState } from './authReducer';
import connectionApi from '../api/ConnectionApi';

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
            
        } catch (err: any) {
            console.log(err.response.data.msg);
        }
    };


    const signUp = () => {};
    const logOut = () => {};
    const removeError = () => {};

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