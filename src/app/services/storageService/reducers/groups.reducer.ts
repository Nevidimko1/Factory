export const GROUPS = {
    'SET_GROUPS': 'GroupsReducer.SET_GROUPS'
} ;

export const GroupsReducer = (state = [], action) => {
    switch(action.type) {
        case GROUPS.SET_GROUPS:
        return [
            ...state,
            ...action.payload
        ];
        default:
            return state;
    }
}
