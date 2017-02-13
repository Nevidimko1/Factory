import * as _ from 'lodash';

import { Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '../';
import { Storage } from './storage';

@Injectable()
export class StorageService {
  private _initialized: boolean = false;
  private storage: Storage;
  public saveGameExists: boolean = false;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    this.storage = new Storage(this.http, this.store);
    this.saveGameExists = this.storage.saveGameExists();
  }

  public loadGame() {
    this.storage.loadGame();
    this._initialized = true;
  }

  public createGame(username) {
    this.storage.newGame(username);
    this._initialized = true;
  }

  public get initialized() {
    return this._initialized;
  }
}