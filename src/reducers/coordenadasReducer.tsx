

type CoordenadasAction =
| { type: 'Activar', payload: any }
| { type: 'RecibirCoordenadas', payload: any }




export const coordenadasReducer = (state: any, action: CoordenadasAction) => {

switch (action.type) {

    case 'Activar':
        return {
            ...state,
            coorActivo: action.payload,
            coordenadas: {}
        };

    case 'RecibirCoordenadas':
        if (state.coorActivo === action.payload.otherId) {
            return {
                ...state,
                coordenadas: action.payload
            }
        }else {
            return state;
        }




    default:
        return state;
}

}
