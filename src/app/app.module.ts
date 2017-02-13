import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules,
} from '@angular/router';
import { Store, provideStore } from '@ngrx/store';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { StorageService, DefinesService, Reducers, Actions } from './services';
import { MenuComponents } from './menu';
import { MainComponents } from './main';
import { UtilsList } from './utils';

import { ViewComponents } from './main/components';

import '../styles/materials.atlas.css';
import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent],
  declarations: [
    AppComponent,
    MenuComponents,
    MainComponents,
    ViewComponents
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    StorageService,
    DefinesService,
    provideStore(Reducers),
    UtilsList,
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    private store: Store<any>
  ) { 
    this.store.dispatch({type: Actions.MONEY.ADD_MONEY, payload: 100});
  }

}
