export const TO_BUY = {
    'INCREMENT_TO_BUY': 'ToBuyReducer.INCREMENT_TO_BUY',
    'DECREMENT_TO_BUY': 'ToBuyReducer.DECREMENT_TO_BUY',
    'CLEAR_TO_BUY': 'ToBuyReducer.CLEAR_TO_BUY'
} ;

export const ToBuyReducer = (state = [], action) => {
    let newState;
    let prevVal;
    
    switch(action.type) {
        case TO_BUY.INCREMENT_TO_BUY:
            newState = [...state];
            prevVal = newState[action.payload];
            newState[action.payload] = prevVal ? prevVal + 1 : 1;
            newState[action.payload] = Number(newState[action.payload].toFixed(2));
            return newState;
        case TO_BUY.DECREMENT_TO_BUY:
            newState = [...state];
            prevVal = newState[action.payload];
            newState[action.payload] = prevVal ? prevVal - 1 : 0;
            newState[action.payload] = Number(newState[action.payload].toFixed(2));
            return newState;
        case TO_BUY.CLEAR_TO_BUY:
            return [];
        default:
            return state;
    }
}
