

type UsuarioAction = 
|  { type: 'cargarSolicitudUsuario', payload: any }
|  { type: 'loginJardinero', payload: any }

export const usuarioReducer = ( state:any, action: UsuarioAction ) => {

    switch (action.type) {
        case 'cargarSolicitudUsuario':
            return {
                ...state,
                solicitudes: action.payload
            };

        case 'loginJardinero':
            return {
                ...state,
                jardinero: action.payload,
                jid: action.payload._id
            }
        
    
        default:
            return state;
    }


}