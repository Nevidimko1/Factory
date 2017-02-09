import { Routes } from '@angular/router';
import { MenuComponent, DefaultMenuComponent, NewGameComponent } from './menu';
import { Main, 
  ShopComponent,
  WorkbenchComponent,
  StorageComponent,
  FactoryComponent,
  AuctionComponent,
  StatsComponent } from './main';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: 'menu', component: MenuComponent, 
    children: [
      { path: '', component: DefaultMenuComponent },
      { path: 'newGame', component: NewGameComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  },
  { path: 'main', component: Main, 
    children: [
      { path: 'shop', component: ShopComponent },
      { path: 'workbench', component: WorkbenchComponent },
      { path: 'storage', component: StorageComponent },
      { path: 'factory', component: FactoryComponent },
      { path: 'auction', component: AuctionComponent },
      { path: 'stats', component: StatsComponent },
      { path: '**', redirectTo: 'shop', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'menu', pathMatch: 'full' }
];
