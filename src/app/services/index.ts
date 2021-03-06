import { NAME, NameReducer } from './storageService/reducers/name.reducer';
import { MONEY, MoneyReducer } from './storageService/reducers/money.reducer';
import { RESOURCES, ResourcesReducer } from './storageService/reducers/resources.reducer';
import { GROUPS, GroupsReducer } from './storageService/reducers/groups.reducer';
import { INVENTORY, InventoryReducer } from './storageService/reducers/inventory.reducer';
import { TOOLS, ToolsReducer } from './storageService/reducers/tools.reducer';

export * from './storageService/storage.service';
export * from './storageService/storage';
export * from './factoryProgress.service';

export const Actions = {
    NAME,
    MONEY,
    RESOURCES,
    GROUPS,
    INVENTORY,
    TOOLS
}

export const Reducers = {
    NameReducer,
    MoneyReducer,
    ResourcesReducer,
    GroupsReducer,
    InventoryReducer,
    ToolsReducer
}