import * as _ from 'lodash';
import * as events from 'events';

import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from './storage';
import { DefinesService } from '../defines.service';

@Injectable()
export class StorageService {
  private _storage: Storage;
  private _initialized: boolean = false;
  private _ee;
  
  public saveGameExists: boolean = false;

  constructor(
    private definesService: DefinesService
  ) {
    this._storage = new Storage(this.definesService);
    this._storage.loadStorage();
    this._ee = new events.EventEmitter();
    this._ee.setMaxListeners(0);

    this.saveGameExists = !_.isEmpty(this._storage.get('name'));
  }

  public loadGame() {
    if(this.saveGameExists) {
      this._initialized = true;
      this._ee.emit();
    }
  }

  public createGame(username) {
    this._storage.clear();
    this._storage.set('name', username);
    this._initialized = true;
  }

  public get initialized() {
    return this._initialized;
  }

  public listen(key, cb) {
    this._ee.on(key, cb);
    return this._storage.get(key);
  }

  public unlisten(key, cb) {
    this._ee.removeListener(key, cb);
  }

  public getItem(key: string) {
    return this._storage.get(key);
  }

  public setItem(key: string, value: any) {
    this._storage.set(key, value);
    console.log('EMIT: ', key);
    this._ee.emit(key, value);
  }
}