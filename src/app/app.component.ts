/*
 * Angular 2 decorators and services
 */
import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {

  constructor(
    public router: Router
  ) { }

}