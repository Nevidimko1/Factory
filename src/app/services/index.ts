import { NAME, NameReducer } from './storageService/reducers/name.reducer';
import { MONEY, MoneyReducer } from './storageService/reducers/money.reducer';
import { TO_BUY, ToBuyReducer } from './storageService/reducers/toBuy.reducer';
import { TO_SELL, ToSellReducer } from './storageService/reducers/toSell.reducer';
import { RESOURCES, ResourcesReducer } from './storageService/reducers/resources.reducer';
import { GROUPS, GroupsReducer } from './storageService/reducers/groups.reducer';
import { INVENTORY, InventoryReducer } from './storageService/reducers/inventory.reducer';

export * from './storageService/storage.service';
export * from './storageService/storage';

export const Actions = {
    NAME,
    MONEY,
    TO_BUY,
    TO_SELL,
    RESOURCES,
    GROUPS,
    INVENTORY
}

export const Reducers = {
    NameReducer,
    MoneyReducer,
    ToBuyReducer,
    ToSellReducer,
    ResourcesReducer,
    GroupsReducer,
    InventoryReducer
}