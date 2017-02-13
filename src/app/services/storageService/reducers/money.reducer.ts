export const MONEY = {
    'ADD_MONEY': 'MoneyReducer.ADD_MONEY',
    'SUBSTRACT_MONEY': 'MoneyReducer.SUBSTRACT_MONEY'
} ;

export const MoneyReducer = (state = 0, action) => {
    let newState;
    let prevVal;
    
    switch(action.type) {
        case MONEY.ADD_MONEY:
            return Number((state + action.payload).toFixed(2));
        case MONEY.SUBSTRACT_MONEY:
            return Number((state - action.payload).toFixed(2));
        default:
            return state;
    }
}
