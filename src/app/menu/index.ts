import { MenuComponent } from './menu.component';
import { DefaultMenuComponent } from './default';
import { NewGameComponent } from './newGame';

export * from './menu.component';
export * from './default';
export * from './newGame';

export const MenuComponents = [
    MenuComponent,
    DefaultMenuComponent, 
    NewGameComponent
];