/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from './app.service';
import { StorageService, DefinesService } from './services';

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
export class AppComponent implements OnInit {

  constructor(
    public appState: AppState,
    public router: Router,
    public storageService: StorageService,
    public definesService: DefinesService
  ) {
    //router.navigateByUrl('menu');
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}