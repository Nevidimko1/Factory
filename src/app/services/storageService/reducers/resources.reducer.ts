export const RESOURCES = {
    'SET_RESOURCES': 'ResourcesReducer.SET_RESOURCES'
} ;

export const ResourcesReducer = (state = [], action) => {
    switch(action.type) {
        case RESOURCES.SET_RESOURCES:
        return [
            ...state,
            ...action.payload
        ];
        default:
            return state;
    }
}
