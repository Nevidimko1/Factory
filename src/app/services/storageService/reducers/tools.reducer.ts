export const TOOLS = {
    'ADD_ITEM': 'ToolsReducer.ADD_ITEM',
    'SET_ITEMS': 'ToolsReducer.SET_ITEMS',
    'RENAME_ITEM': 'ToolsReducer.RENAME_ITEM',
    'CHANGE_MATERIAL': 'ToolsReducer.CHANGE_MATERIAL',
    'CHANGE_STATE': 'ToolsReducer.CHANGE_STATE',
    'INCREMENT_USED_ITEM': 'ToolsReducer.INCREMENT_USED_ITEM',
    'RESET_USED_ITEMS': 'ToolsReducer.RESET_USED_ITEMS'
};

let progress = (usedItems) => {
    let current = 0,
        max = 0;

    usedItems.forEach((i) => {
        current += i[1];
        max += i[2];
    });
    return Math.round(current / max * 100);
}

export const ToolsReducer = (state = [], action) => {
    let newState;
    let item;
    let d;
    
    switch(action.type) {
        case TOOLS.ADD_ITEM:
            let n = state.length + 1;
            return [...state,
            {
                id: state.length,
                level: 1,
                speed: 1,
                name: 'Новое оборудование №' + n,
                progress: 0,
                started: false,
                usedItems: []
            }];
        case TOOLS.SET_ITEMS:
            return [...action.payload];
        case TOOLS.RENAME_ITEM:
            newState = [...state];    
            item = newState[action.payload.id];
            if(item) {
                item.name = action.payload.name;
                return newState;
            } else {
                return state;
            }
        case TOOLS.CHANGE_MATERIAL:
            newState = [...state];    
            item = newState[action.payload.id];
            if(item) {
                item.materialId = Number(action.payload.materialId);
                item.usedItems = action.payload.usedItems;
                item.progress = 0;
                return newState;
            } else {
                return state;
            }
        case TOOLS.CHANGE_STATE:
            newState = [...state];    
            item = newState[action.payload.id];
            if(item) {
                item.started = action.payload.state;
                return newState;
            } else {
                return state;
            }
        case TOOLS.INCREMENT_USED_ITEM:
            newState = [...state];    
            item = newState[action.payload.id];
            d = new Date();
            if(item) {
                item.usedItems[action.payload.i][1]++;
                item.nextTickAt = d.getTime() + (1000 / item.speed);
                item.progress = progress(item.usedItems);
                return newState;
            } else {
                return state;
            }
        case TOOLS.RESET_USED_ITEMS:
            newState = [...state];    
            item = newState[action.payload.id];
            d = new Date();
            if(item) {
                item.usedItems.forEach((i) => i[1] = 0);
                item.nextTickAt = d.getTime() + (1000 / item.speed);
                item.progress = 0;
                return newState;
            } else {
                return state;
            }
        default:
            return state;
    }
}
