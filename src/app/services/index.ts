import { MONEY, MoneyReducer } from './storageService/reducers/money.reducer';
import { TO_BUY, ToBuyReducer } from './storageService/reducers/toBuy.reducer';
import { INVENTORY, InventoryReducer } from './storageService/reducers/inventory.reducer';

export * from './storageService/storage.service';
export * from './defines.service';

export const Actions = {
    MONEY,
    TO_BUY,
    INVENTORY
}

export const Reducers = {
    MoneyReducer,
    ToBuyReducer,
    InventoryReducer
}