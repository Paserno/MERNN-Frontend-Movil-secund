

type UsuarioAction = 
|  { type: 'cargarSolicitudUsuario', payload: any }
|  { type: 'loginJardinero', payload: any }
|  { type: 'SeleccionarSolicitud', payload: any }
|  { type: 'ActualizarSolicitud', payload: any }
|  { type: 'SolicitudEliminada'}
|  { type: 'CargarServicios', payload: any }
|  { type: 'CargarDetalleSolicitud', payload: any}
|  { type: 'CargaDetalleVacia'}
|  { type: 'EliminarDetalleSolicitud', payload: any}
|  { type: 'NuevoDetalleSolicitud', payload: any}





export const usuarioReducer = ( state:any, action: UsuarioAction ) => {

    switch (action.type) {
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
    
        default:
            return state;
    }


}