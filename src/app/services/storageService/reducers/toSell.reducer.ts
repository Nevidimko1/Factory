export const TO_SELL = {
    'INCREMENT_TO_SELL': 'ToSellReducer.INCREMENT_TO_SELL',
    'DECREMENT_TO_SELL': 'ToSellReducer.DECREMENT_TO_SELL',
    'CLEAR_TO_SELL': 'ToSellReducer.CLEAR_TO_SELL'
} ;

export const ToSellReducer = (state = [], action) => {
    let newState;
    let prevVal;
    
    switch(action.type) {
        case TO_SELL.INCREMENT_TO_SELL:
            newState = [...state];
            prevVal = newState[action.payload];
            newState[action.payload] = prevVal ? prevVal + 1 : 1;
            newState[action.payload] = Number(newState[action.payload].toFixed(2));
            return newState;
        case TO_SELL.DECREMENT_TO_SELL:
            newState = [...state];
            prevVal = newState[action.payload];
            newState[action.payload] = prevVal ? prevVal - 1 : 0;
            newState[action.payload] = Number(newState[action.payload].toFixed(2));
            return newState;
        case TO_SELL.CLEAR_TO_SELL:
            return [];
        default:
            return state;
    }
}
