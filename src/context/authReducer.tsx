import { Usuario } from '../interface/loginInterfaces';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    logged: boolean,
    token : string | null;
    errorMessage: string;
    user: Usuario | null;
}


type AuthAction = 
    |  { type: 'signUp', payload: { token: string, user: Usuario, logged: boolean } }
    |  { type: 'addError', payload: string }
    |  { type: 'removeError' }
    |  { type: 'notAuthenticated' }
    |  { type: 'logout' }
    |  { type: 'editUser', payload: any }


export const authReducer = ( state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'addError':
            return { 
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user,
                logged: action.payload.logged
            }

        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
                logged: false
            }

        case 'editUser':
            return {
                ...state,
                user: action.payload
            }

       
            
    
        default:
            return state;
    }

}