import { Usuario } from '../interface/activoInterface';



type UsuarioAction = 
|  { type: 'cargarUsuarios', payload: { usuarios: Usuario[] } }

export const usuarioReducer = ( state:any, action: UsuarioAction ) => {

    switch (action.type) {
        case 'cargarUsuarios':
            return {
                ...state,
                usuarios: action.payload
            };
    
        default:
            return state;
    }


}