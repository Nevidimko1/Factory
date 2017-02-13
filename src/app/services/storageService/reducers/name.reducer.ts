export const NAME = {
    'SET_NAME': 'NameReducer.SET_NAME'
} ;

export const NameReducer = (state = '', action) => {
    switch(action.type) {
        case NAME.SET_NAME:
            return state = action.payload;
        default:
            return state;
    }
}
