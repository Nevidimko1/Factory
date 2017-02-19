import { Main } from './main';
import { ShopComponent } from './views/shop/shop.component';
import { WorkbenchComponent } from './views/workbench/workbench.component';
import { StorageComponent } from './views/storage/storage.component';
import { FactoryComponent, FactorySectionsList } from './views/factory';
import { AuctionComponent } from './views/auction/auction.component';
import { StatsComponent } from './views/stats/stats.component';

export * from './main';
export * from './views/shop/shop.component';
export * from './views/workbench/workbench.component';
export * from './views/storage/storage.component';
export * from './views/factory';
export * from './views/auction/auction.component';
export * from './views/stats/stats.component';

export const MainComponents = [ 
  Main,
  ShopComponent,
  WorkbenchComponent,
  StorageComponent,
  FactoryComponent,
  FactorySectionsList,
  AuctionComponent,
  StatsComponent  
];