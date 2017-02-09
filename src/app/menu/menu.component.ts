import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'game-menu',
  styleUrls: [
    './menu.component.css'
  ],
  template: `
      <router-outlet></router-outlet>
  `
})
export class MenuComponent{

}
