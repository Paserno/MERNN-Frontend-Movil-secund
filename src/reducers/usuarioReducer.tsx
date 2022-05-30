

type UsuarioAction = 
|  { type: 'cargarSolicitudUsuario', payload: any }
|  { type: 'loginJardinero', payload: any }
|  { type: 'ActualizarJardinero', payload: any }
|  { type: 'SeleccionarSolicitud', payload: any }
|  { type: 'ActualizarSolicitud', payload: any }
|  { type: 'SolicitudEliminada'}
|  { type: 'CargarServicios', payload: any }
|  { type: 'CargarDetalleSolicitud', payload: any}
|  { type: 'CargaDetalleVacia'}
|  { type: 'NuevoDetalleSolicitud', payload: any}
|  { type: 'EliminarDetalleSolicitud', payload: any}
|  { type: 'ActualizarDetalleSolicitud', payload: any}
|  { type: 'uiOpenModal', payload: any}
|  { type: 'uiCloseModal'}
|  { type: 'uiInLoadingModal'}
|  { type: 'uiOutLoadingModal'}
// isLoadingModal





export const usuarioReducer = ( state:any, action: UsuarioAction ) => {

    switch (action.type) {

        case 'uiOutLoadingModal': 
            return {
                ...state,
                isLoadingModal: false
            }

        case 'uiInLoadingModal': 
            return {
                ...state,
                isLoadingModal: true
            }
        
        case 'ActualizarJardinero': 
            return {
                ...state,
                jardinero: action.payload
            }

        case 'cargarSolicitudUsuario':
            return {
                ...state,
                solicitudes: action.payload,
                deleteSoli: false
            };

        case 'loginJardinero':
            return {
                ...state,
                jardinero: action.payload,
                jid: action.payload._id
            }
        
        case 'SeleccionarSolicitud': 
            return {
                ...state,
                deleteSoli: false,
                solicitud: action.payload,
            }

        case 'ActualizarSolicitud':
            return {
                ...state,
                solicitud: action.payload,
                deleteSoli: false

            }

        case 'SolicitudEliminada': 
            return {
                ...state,
                solicitud: {},
                deleteSoli: true
            }

        case 'CargarServicios': 
            return {
                ...state,
                servicios: action.payload
            }

        case 'CargarDetalleSolicitud':
            return {
                ...state,
                detalleSolicitud: action.payload
            }
        
        case 'CargaDetalleVacia':
            return {
                ...state,
                detalleSolicitud: []
            }

        case 'ActualizarDetalleSolicitud': 
            return {
                ...state,
                detalleSolicitud: state.detalleSolicitud.map(
                    (e: { _id: string }) => ( e._id === action.payload._id)
                        ? action.payload
                        : e
                )
            }
        
        case 'EliminarDetalleSolicitud':
            return {
                ...state,
                detalleSolicitud: state.detalleSolicitud.filter(
                    (e: { _id: string }) => ( e._id === action.payload._id)
                        ? false
                        : true
                )
            }

        case 'NuevoDetalleSolicitud':
            return {
                ...state,
                detalleSolicitud: [...state.detalleSolicitud, action.payload]
            }

        case 'uiOpenModal': 
            return {
                ...state,
                isOpenModal: true,
                servicio: action.payload
            }

        case 'uiCloseModal': 
            return {
                ...state,
                isOpenModal: false,
                servicio: {}
            }


    
        default:
            return state;
    }


}