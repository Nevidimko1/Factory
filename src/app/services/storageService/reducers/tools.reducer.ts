export const TOOLS = {
    'ADD_ITEM': 'ToolsReducer.ADD_ITEM',
    'SET_ITEMS': 'ToolsReducer.SET_ITEMS',
    'RENAME_ITEM': 'ToolsReducer.RENAME_ITEM'
} ;

export const ToolsReducer = (state = [], action) => {
    let newState;
    let item;
    
    switch(action.type) {
        case TOOLS.ADD_ITEM:
            let n = state.length + 1;
            return [...state,
            {
                id: state.length,
                level: 1,
                speed: 1,
                name: 'Новое оборудование №' + n
            }];
        case TOOLS.SET_ITEMS:
            return [...action.payload];
        case TOOLS.RENAME_ITEM:
            newState = [...state];    
            item = newState[action.payload.id];
            if(item) {
                item.name = action.payload.name;
                return newState
            } else {
                return state;
            }
        default:
            return state;
    }
}
