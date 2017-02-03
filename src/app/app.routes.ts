import { Routes } from '@angular/router';
import { MenuComponent, DefaultMenuComponent, NewGameComponent } from './menu';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: 'menu', component: MenuComponent, 
    children: [
      { path: '', component: DefaultMenuComponent },
      { path: 'newGame', component: NewGameComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'menu', pathMatch: 'full' },
];
