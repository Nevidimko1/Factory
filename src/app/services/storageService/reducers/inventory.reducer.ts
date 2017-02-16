export const INVENTORY = {
    'ADD_ITEMS': 'InventoryReducer.ADD_ITEMS',
    'SUBSTRACT_ITEMS': 'InventoryReducer.SUBSTRACT_ITEMS',
    'SET_ITEMS': 'InventoryReducer.SET_ITEMS'
} ;

export const InventoryReducer = (state = [], action) => {
    let newState;
    let prevVal;
    
    switch(action.type) {
        case INVENTORY.ADD_ITEMS:
            newState = [...state];
            prevVal = newState[action.payload.id];
            newState[action.payload.id] = prevVal ? prevVal + action.payload.number : action.payload.number;
            newState[action.payload.id] = Number(newState[action.payload.id].toFixed(2));
            return newState;
        case INVENTORY.SUBSTRACT_ITEMS:
            newState = [...state];
            prevVal = newState[action.payload.id];
            newState[action.payload.id] = prevVal ? prevVal - action.payload.number : action.payload.number;
            newState[action.payload.id] = Number(newState[action.payload.id].toFixed(2));
            return newState;
        case INVENTORY.SET_ITEMS:
            return [...action.payload];
        default:
            return state;
    }
}
