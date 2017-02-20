export const TOOLS = {
    'ADD_ITEM': 'ToolsReducer.ADD_ITEM',
    'SET_ITEMS': 'ToolsReducer.SET_ITEMS'
} ;

export const ToolsReducer = (state = [], action) => {
    let newState;
    let prevVal;
    
    switch(action.type) {
        case TOOLS.ADD_ITEM:
            let n = state.length + 1;
            return [...state,
            {
                id: state.length,
                name: 'Новое оборудование №' + n
            }];
        case TOOLS.SET_ITEMS:
            return [...action.payload];
        default:
            return state;
    }
}
