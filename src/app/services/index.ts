import { NAME, NameReducer } from './storageService/reducers/name.reducer';
import { MONEY, MoneyReducer } from './storageService/reducers/money.reducer';
import { TO_BUY, ToBuyReducer } from './storageService/reducers/toBuy.reducer';
import { RESOURCES, ResourcesReducer } from './storageService/reducers/resources.reducer';
import { INVENTORY, InventoryReducer } from './storageService/reducers/inventory.reducer';

export * from './storageService/storage.service';
export * from './storageService/storage';

export const Actions = {
    NAME,
    MONEY,
    TO_BUY,
    RESOURCES,
    INVENTORY
}

export const Reducers = {
    NameReducer,
    MoneyReducer,
    ToBuyReducer,
    ResourcesReducer,
    InventoryReducer
}