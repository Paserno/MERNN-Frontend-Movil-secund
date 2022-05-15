

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

        case 'nuevoMensaje':
            console.log(action.payload)

            if (state.chatActivo === action.payload.de ||
                state.chatActivo === action.payload.para
            ) {
                console.log(action.payload)
                return {
                    ...state,
                    mensajes: [...state.mensajes, action.payload]
                }
            } else {
                return state;
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