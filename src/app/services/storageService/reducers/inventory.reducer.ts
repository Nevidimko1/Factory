export const INVENTORY = {
    'ADD_ITEMS': 'InventoryReducer_ADD_ITEMS',
    'SUBSTRACT_ITEMS': 'InventoryReducer_SUBSTRACT_ITEMS'
} ;

export const InventoryReducer = (state = [], action) => {
    let newState;
    let prevVal;
    
    switch(action.type) {
        case INVENTORY.ADD_ITEMS:
            newState = [...state];
            prevVal = newState[action.id];
            newState[action.id] = prevVal ? prevVal + action.number : action.number;
            newState[action.id] = Number(newState[action.id].toFixed(2));
            return newState;
        case INVENTORY.SUBSTRACT_ITEMS:
            newState = [...state];
            prevVal = newState[action.id];
            newState[action.id] = prevVal ? prevVal - action.number : action.number;
            newState[action.id] = Number(newState[action.id].toFixed(2));
            return newState;
        default:
            return state;
    }
}
