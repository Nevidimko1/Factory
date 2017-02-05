import { Main } from './main';
import { ShopComponent } from './shop/shop.component';
import { WorkbenchComponent } from './workbench/workbench.component';
import { StorageComponent } from './storage/storage.component';
import { FactoryComponent } from './factory/factory.component';
import { AuctionComponent } from './auction/auction.component';
import { StatsComponent } from './stats/stats.component';

export * from './main';
export * from './shop/shop.component';
export * from './workbench/workbench.component';
export * from './storage/storage.component';
export * from './factory/factory.component';
export * from './auction/auction.component';
export * from './stats/stats.component';

export const MainComponents = [ 
  Main,
  ShopComponent,
  WorkbenchComponent,
  StorageComponent,
  FactoryComponent,
  AuctionComponent,
  StatsComponent  
];