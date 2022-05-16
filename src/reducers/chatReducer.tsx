

type ChatAction = 
|  { type: 'CerrarSesion' }
|  { type: 'ActivarChat', payload:any }
|  { type: 'usuariosCargados', payload:any }
|  { type: 'usuariosCargados', payload:any }
|  { type: 'nuevoMensaje', payload:any }
|  { type: 'cargarMensajes', payload:any }

export const chatReducer = (state: any, action: ChatAction) => {

    switch (action.type) {
        case 'CerrarSesion':
            return {
                uid: '',
                chatActivo: null,
                usuarios:[],
                mensajes:[]
            }

        case 'nuevoMensaje':
            if (state.chatActivo === action.payload.de ||
                state.chatActivo === action.payload.para
            ) {
                return {
                    ...state,
                    mensajes: [action.payload, ...state.mensajes]
                }
            } else {
                return state;
            }
        
        case 'usuariosCargados':
            return {
                ...state,
                usuarios: [...action.payload]
            }
        
        case 'ActivarChat':
            if (state.chatActivo === action.payload) return state;
            return {
                ...state,
                chatActivo: action.payload,
                mensajes: []
            }

        
        
        case 'cargarMensajes': 
            return {
                ...state,
                mensajes: [...(action.payload || []) ]
            }

    
        default:
            return state;
    }

}